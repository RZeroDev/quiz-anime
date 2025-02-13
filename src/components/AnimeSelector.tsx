import React from "react";
import { motion } from "framer-motion";

interface AnimeSelectorProps {
  onSelect: (anime: string) => void;
}

const animes = [
  { id: "naruto", name: "Naruto", color: "from-orange-500 to-red-500" , image: "https://i.pinimg.com/736x/85/11/68/8511686040990729f0f7225f4443f36f.jpg"},
  { id: "one piece", name: "One Piece", color: "from-blue-500 to-red-500", image: "https://i.pinimg.com/736x/d4/c9/1d/d4c91d83ddee18daca6dd3c6e41c7cd7.jpg" },
  {
    id: "dragon ball",
    name: "Dragon Ball",
    color: "from-yellow-500 to-orange-500",
    image: "https://i.pinimg.com/736x/e2/f0/6c/e2f06c9101dc22814be2a2352f7dc871.jpg",
  },
  { id: "bleach", name: "Bleach", color: "from-purple-500 to-blue-500", image: "https://i.pinimg.com/736x/13/18/6c/13186c2ef4666a91a1e18b1443200217.jpg" },
];

export function AnimeSelector({ onSelect }: AnimeSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl"
    >
      <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        Choisis ton anime préféré
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {animes.map((anime) => (
          <motion.div key={anime.id} className="flex flex-col items-center justify-center">
            <img
              src={anime.image}
              alt={anime.name}
              className="w-full h-[200px] rounded-2xl mb-4 object-cover"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(anime.id)}
              className={`p-4 rounded-2xl shadow-xl bg-gradient-to-r w-full ${anime.color}
                       text-white font-bold text-2xl transition-shadow duration-200
                       hover:shadow-2xl`}
            >
              {anime.name}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
