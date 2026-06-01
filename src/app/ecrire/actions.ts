"use server";

import poems from "@/data/poems.json";

export async function publierPoeme(formData: FormData) {
  const password = formData.get("password");
  // Remplace "MonMotDePasseSecret" par le mot de passe de ton choix pour protéger l'accès
  if (password !== "1234") {
    throw new Error("Mot de passe incorrect");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const summary = content.substring(0, 120) + "...";
  
  // Générer un ID propre pour l'URL (ex: "Mon Beau Poème" -> "mon-beau-poeme")
  const id = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const nouveauPoeme = {
    id,
    title,
    date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
    summary,
    content,
  };

  // On ajoute le nouveau poème au début de la liste
  const nouvelleListe = [nouveauPoeme, ...poems];

  // Variables pour l'API GitHub
  const OWNER = "Lio721"; // À MODIFIER
  const REPO = "sitepoesie";    // À MODIFIER
  const FILE_PATH = "src/data/poems.json";
  const TOKEN = process.env.GITHUB_TOKEN;

  // 1. Récupérer le "sha" (l'identifiant de version) du fichier actuel sur GitHub
  const resGet = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  const fileData = await resGet.json();
  const sha = fileData.sha;

  // 2. Envoyer le fichier mis à jour à GitHub
  const resPut = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Plume de nuit : Publication de "${title}"`,
      content: Buffer.from(JSON.stringify(nouvelleListe, null, 2)).toString("base64"),
      sha: sha,
    }),
  });

  if (!resPut.ok) {
    throw new Error("Échec de la publication sur GitHub");
  }
}