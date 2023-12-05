import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  // https://mdtwhmfdnxmzoktmfzab.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  console.log("new", newCabin);
  const hasImagePath = newCabin.image.startsWith(supabaseUrl);
  console.log("img path", hasImagePath);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Craete Cabin
  let query = supabase.from("cabins");

  // create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // for edit
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  // upload copy image
  if (hasImagePath) {
    return data;
  }

  // Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // delete the cabin there was an error uplading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log("storage error", storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
}
