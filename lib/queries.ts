import { client } from "./sanity.client";

export async function getHomePage() {
  return client.fetch(
    `*[_type == "page" && slug.current == "home"][0]{
      title, slug,
      sections[]{
        _type, _key, heading, subheading, body,
        image{ asset->{url} },
        images[]{ asset->{url} },
        ctaText, ctaLink,
        items[]{ question, answer }
      }
    }`
  );
}

export async function getServices() {
  return client.fetch(
    `*[_type == "service"] | order(order asc){
      _id, title, slug, description, heroHeading, heroSubheading, body,
      image{ asset->{url} },
      icon,
      features[]{ title, description, icon },
      galleryBand[]{ asset->{url} },
      order
    }`
  );
}

export async function getServiceBySlug(slug: string) {
  return client.fetch(
    `*[_type == "service" && slug.current == $slug][0]{
      _id, title, slug, description, heroHeading, heroSubheading, body,
      image{ asset->{url} },
      icon,
      features[]{ title, description, icon },
      galleryBand[]{ asset->{url} },
      "categories": *[_type == "category" && references(^._id)]{
        _id, title, slug, description,
        image{ asset->{url} },
        images[]{ asset->{url} }
      }
    }`,
    { slug }
  );
}

export async function getCategoryBySlug(serviceSlug: string, categorySlug: string) {
  return client.fetch(
    `{
      "service": *[_type == "service" && slug.current == $serviceSlug][0]{ _id, title, slug },
      "category": *[_type == "category" && slug.current == $categorySlug][0]{
        _id, title, slug, description,
        "galleryImages": *[_type == "galleryImage" && references(^._id)]{
          _id, title, image{ asset->{url} }
        }
      }
    }`,
    { serviceSlug, categorySlug }
  );
}

export async function getReviews() {
  return client.fetch(
    `*[_type == "review"] | order(order asc){
      _id, name, initials, rating, date, text
    }`
  );
}

export async function getSettings() {
  return client.fetch(
    `*[_type == "settings"][0]{
      siteName, email, phone, address, instagram, facebook, footerText
    }`
  );
}

export async function getPageBySlug(slug: string) {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      title, slug,
      sections[]{
        _type, _key, heading, subheading, body,
        image{ asset->{url} },
        images[]{ asset->{url} },
        ctaText, ctaLink
      }
    }`,
    { slug }
  );
}
