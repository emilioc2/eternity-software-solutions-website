export const servicesQuery = `*[_type == "service"] | order(order asc) { _id, title, description }`;
export const projectsQuery = `*[_type == "project"] | order(order asc) { _id, title, description, tag, url, previewImage { alt, asset->{ _ref, url } } }`;
export const contactSettingsQuery = `*[_type == "contactSettings"][0] { whatsappNumber }`;
