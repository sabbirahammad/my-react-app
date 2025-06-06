import React from "react";

const sponsors = [
  {
    id: 1,
    name: "Sponsor 1",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg",
    link: "https://example.com/sponsor1",
    description: "Leading tech innovator",
  },
  {
    id: 2,
    name: "Sponsor 2",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png",
    link: "https://example.com/sponsor2",
    description: "Global search engine",
  },
  {
    id: 3,
    name: "Sponsor 3",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg",
    link: "https://example.com/sponsor3",
    description: "Movie database leader",
  },
  {
    id: 4,
    name: "Sponsor 4",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Dell_Logo.svg",
    link: "https://example.com/sponsor4",
    description: "PC and hardware giant",
  },
  {
    id: 5,
    name: "Sponsor 5",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    link: "https://example.com/sponsor5",
    description: "E-commerce pioneer",
  },
];

const SponsorMasonryBlockBG = () => {
  return (
    <section className="bg-gray-900 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-white text-3xl font-semibold mb-10 text-center">
          Our Sponsors
        </h2>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {sponsors.map(({ id, name, logo, link, description }) => (
            <a
              key={id}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-6 rounded-lg overflow-hidden shadow-md bg-gray-800 p-6"
              aria-label={`Visit ${name} website`}
            >
              <img
                src={logo}
                alt={`${name} logo`}
                className="w-full object-contain max-h-28 mx-auto"
                loading="lazy"
              />
              <h3 className="text-white text-lg font-semibold mt-4 text-center">
                {name}
              </h3>
              <p className="text-gray-400 text-sm text-center mt-1">
                {description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorMasonryBlockBG;

