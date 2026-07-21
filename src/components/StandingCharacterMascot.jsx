import React from 'react';

export default function StandingCharacterMascot({ character, size = 'large' }) {
  const name = (character?.name || '').toLowerCase().trim();
  
  // Naruto
  const isNaruto = name.includes('naruto');
  const isSasuke = name.includes('sasuke');
  const isSakura = name.includes('sakura');
  const isKakashi = name.includes('kakashi');

  // Dragon Ball
  const isGoku = name.includes('goku');
  const isVegeta = name.includes('vegeta');

  // Pokemon
  const isPikachu = name.includes('pikachu') || name.includes('pika');

  // One Piece
  const isLuffy = name.includes('luffy');
  const isNami = name.includes('nami');
  const isRobin = name.includes('robin');
  const isSanji = name.includes('sanji');
  const isZoro = name.includes('zoro');

  // Doraemon
  const isNobita = name.includes('nobita');
  const isDorami = name.includes('dorami');
  const isDoraemon = name.includes('doraemon') && !isDorami;
  const isShizuka = name.includes('shizuka');
  const isSunio = name.includes('sunio') || name.includes('suneo');
  const isGian = name.includes('gian') || name.includes('gein') || name.includes('takeshi');

  // Shinchan
  const isKazama = name.includes('kazama') || name.includes('toru');
  const isNene = name.includes('nene') || name.includes('nani');
  const isBochan = name.includes('boo') || name.includes('bo-chan') || name.includes('bochan');
  const isMasao = name.includes('masao') || name.includes('mausao');
  const isHimawari = name.includes('hima') || name.includes('himawari');
  const isShinchan = (name.includes('shinchan') || name.includes('shinnosuke')) && !isHimawari;

  // Harry Potter
  const isHermione = name.includes('hermione') || name.includes('hermoine');
  const isRon = (name.includes('weasley') || name.includes('ron ') || name.startsWith('ron') || name === 'ron') && !isZoro && !isRobin;
  const isDraco = name.includes('draco') || name.includes('malfoy');
  const isHedwig = name.includes('hedwig') || name.includes('owl');
  const isCedric = name.includes('cedric') || name.includes('diggory');
  const isHarry = name.includes('harry') && !isHermione && !isRon && !isDraco && !isHedwig && !isCedric;

  // Fallback check
  const isCustomOrFallback = !isNaruto && !isSasuke && !isSakura && !isKakashi &&
                             !isGoku && !isVegeta && !isPikachu &&
                             !isLuffy && !isNami && !isRobin && !isSanji && !isZoro &&
                             !isNobita && !isDoraemon && !isShizuka && !isDorami && !isSunio && !isGian &&
                             !isShinchan && !isKazama && !isNene && !isBochan && !isMasao && !isHimawari &&
                             !isHarry && !isHermione && !isRon && !isDraco && !isHedwig && !isCedric;

  const containerHeight = size === 'large' ? 'h-64 sm:h-72' : 'h-48';

  return (
    <div className={`relative flex flex-col items-center justify-end ${containerHeight} w-full overflow-hidden p-2 select-none group`}>
      
      {/* CSS Arm Waving Animation */}
      <style>{`
        @keyframes waveArm {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-25deg); }
        }
        .animate-wave-arm {
          animation: waveArm 1.2s infinite ease-in-out;
          transform-origin: bottom left;
        }
      `}</style>

      {/* SVG Canvas wrapper */}
      <div className="w-full h-full flex items-center justify-center">

        {/* 1. NARUTO UZUMAKI */}
        {isNaruto && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="55" ry="8" fill="rgba(0,0,0,0.15)" />
            {/* Legs & Blue Shinobi Shoes */}
            <rect x="75" y="200" width="16" height="85" fill="#ea580c" rx="6" />
            <rect x="109" y="200" width="16" height="85" fill="#ea580c" rx="6" />
            <ellipse cx="83" cy="280" rx="14" ry="7" fill="#1e3a8a" />
            <ellipse cx="117" cy="280" rx="14" ry="7" fill="#1e3a8a" />
            {/* Orange Jumpsuit with Black Collar */}
            <rect x="60" y="110" width="80" height="95" fill="#ea580c" rx="10" />
            <rect x="75" y="110" width="50" height="20" fill="#1e293b" rx="4" />
            <circle cx="100" cy="155" r="14" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />

            <g className="animate-wave-arm">
              <rect x="135" y="115" width="20" height="60" fill="#ea580c" rx="10" transform="rotate(-130 135 115)" />
              <circle cx="178" cy="68" r="11" fill="#fef08a" />
              <text x="180" y="55" fontSize="18">👋</text>
            </g>

            {/* Head & Headband */}
            <circle cx="100" cy="75" r="42" fill="#fde047" />
            <polygon points="55,60 40,25 75,45" fill="#eab308" />
            <polygon points="85,45 100,10 115,45" fill="#eab308" />
            <polygon points="125,45 160,25 145,60" fill="#eab308" />
            {/* Leaf Headband */}
            <rect x="58" y="55" width="84" height="18" fill="#1e293b" rx="4" />
            <rect x="80" y="57" width="40" height="14" fill="#94a3b8" rx="3" />

            {/* Whisker Marks */}
            <line x1="66" y1="78" x2="78" y2="80" stroke="#78350f" strokeWidth="2" />
            <line x1="65" y1="84" x2="78" y2="84" stroke="#78350f" strokeWidth="2" />
            <line x1="134" y1="78" x2="122" y2="80" stroke="#78350f" strokeWidth="2" />
            <line x1="135" y1="84" x2="122" y2="84" stroke="#78350f" strokeWidth="2" />

            <circle cx="82" cy="75" r="5" fill="#0284c7" />
            <circle cx="118" cy="75" r="5" fill="#0284c7" />
            <path d="M 80 94 Q 100 112 120 94 Z" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
          </svg>
        )}

        {/* 2. SASUKE UCHIHA */}
        {isSasuke && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="55" ry="8" fill="rgba(0,0,0,0.15)" />
            {/* White Shorts & Shinobi Boots */}
            <rect x="75" y="190" width="16" height="95" fill="#f8fafc" rx="6" />
            <rect x="109" y="190" width="16" height="95" fill="#f8fafc" rx="6" />
            <ellipse cx="83" cy="280" rx="14" ry="7" fill="#1e3a8a" />
            <ellipse cx="117" cy="280" rx="14" ry="7" fill="#1e3a8a" />
            {/* Blue High Collar Shirt */}
            <rect x="60" y="110" width="80" height="85" fill="#1e3a8a" rx="10" />

            <g className="animate-wave-arm">
              <rect x="135" y="115" width="20" height="60" fill="#1e3a8a" rx="10" transform="rotate(-130 135 115)" />
              <circle cx="178" cy="68" r="11" fill="#fde047" />
              <text x="180" y="55" fontSize="18">👋</text>
            </g>

            {/* Head & Dark Spiky Hair */}
            <circle cx="100" cy="75" r="42" fill="#fde047" />
            <path d="M 50 75 C 45 25, 155 25, 150 75 Z" fill="#0f172a" />
            <polygon points="50,75 35,50 65,70" fill="#0f172a" />
            <polygon points="150,75 165,50 135,70" fill="#0f172a" />
            {/* Sharingan Red Eyes */}
            <circle cx="82" cy="75" r="6" fill="#ef4444" stroke="#0f172a" strokeWidth="1.5" />
            <circle cx="118" cy="75" r="6" fill="#ef4444" stroke="#0f172a" strokeWidth="1.5" />
            <circle cx="82" cy="75" r="2" fill="#0f172a" />
            <circle cx="118" cy="75" r="2" fill="#0f172a" />
            <path d="M 85 96 L 115 96" stroke="#0f172a" strokeWidth="3" />
          </svg>
        )}

        {/* 3. SAKURA HARUNO */}
        {isSakura && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="50" ry="8" fill="rgba(0,0,0,0.15)" />
            <rect x="78" y="190" width="14" height="92" fill="#fbcfe8" rx="6" />
            <rect x="108" y="190" width="14" height="92" fill="#fbcfe8" rx="6" />
            <ellipse cx="85" cy="280" rx="12" ry="7" fill="#1e3a8a" />
            <ellipse cx="115" cy="280" rx="12" ry="7" fill="#1e3a8a" />
            <path d="M 65 125 L 50 195 L 150 195 L 135 125 Z" fill="#ef4444" />

            <g className="animate-wave-arm">
              <rect x="135" y="130" width="18" height="55" fill="#ef4444" rx="9" transform="rotate(-130 135 130)" />
              <circle cx="175" cy="82" r="10" fill="#fde047" />
              <text x="178" y="70" fontSize="18">👋</text>
            </g>

            <circle cx="100" cy="75" r="42" fill="#fde047" />
            {/* Bright Pink Hair */}
            <path d="M 45 75 C 40 25, 160 25, 155 75 Z" fill="#ec4899" />
            <circle cx="82" cy="75" r="6" fill="#16a34a" />
            <circle cx="118" cy="75" r="6" fill="#16a34a" />
            <path d="M 86 94 Q 100 108 114 94" stroke="#0f172a" strokeWidth="3" fill="none" />
          </svg>
        )}

        {/* 4. KAKASHI HATAKE */}
        {isKakashi && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="55" ry="8" fill="rgba(0,0,0,0.15)" />
            {/* Jonin Vest & Pants */}
            <rect x="75" y="180" width="16" height="102" fill="#1e293b" rx="6" />
            <rect x="109" y="180" width="16" height="102" fill="#1e293b" rx="6" />
            <ellipse cx="83" cy="280" rx="14" ry="7" fill="#0f172a" />
            <ellipse cx="117" cy="280" rx="14" ry="7" fill="#0f172a" />
            <rect x="60" y="120" width="80" height="65" fill="#15803d" rx="10" />

            <g className="animate-wave-arm">
              <rect x="135" y="125" width="20" height="60" fill="#15803d" rx="10" transform="rotate(-130 135 125)" />
              <circle cx="178" cy="77" r="10" fill="#fde047" />
              <text x="180" y="65" fontSize="18">👋</text>
            </g>

            {/* Silver Spiky Hair & Face Mask */}
            <circle cx="100" cy="75" r="42" fill="#fde047" />
            <polygon points="60,55 40,15 80,40" fill="#cbd5e1" />
            <polygon points="90,40 100,5 120,40" fill="#cbd5e1" />
            <polygon points="120,40 150,15 140,60" fill="#cbd5e1" />
            {/* Black Face Mask */}
            <rect x="65" y="72" width="70" height="30" fill="#1e293b" rx="6" />
            {/* Headband slanted over Left Eye */}
            <rect x="58" y="52" width="84" height="18" fill="#1e293b" rx="4" transform="rotate(10 100 60)" />
            <circle cx="118" cy="70" r="5" fill="#0f172a" />
          </svg>
        )}

        {/* 5. GOKU (DRAGON BALL Z) */}
        {isGoku && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="60" ry="10" fill="rgba(0,0,0,0.15)" />
            {/* Legs & Boots */}
            <rect x="72" y="190" width="20" height="92" fill="#f97316" rx="8" />
            <rect x="108" y="190" width="20" height="92" fill="#f97316" rx="8" />
            <ellipse cx="82" cy="280" rx="15" ry="8" fill="#1e3a8a" />
            <ellipse cx="118" cy="280" rx="15" ry="8" fill="#1e3a8a" />
            {/* Orange Gi & Blue Undershirt */}
            <rect x="55" y="110" width="90" height="85" fill="#f97316" rx="12" />
            <rect x="75" y="110" width="50" height="25" fill="#1e3a8a" rx="4" />
            <rect x="60" y="170" width="80" height="12" fill="#1e3a8a" rx="4" />

            <g className="animate-wave-arm">
              <rect x="140" y="115" width="22" height="65" fill="#f97316" rx="10" transform="rotate(-130 140 115)" />
              <circle cx="184" cy="68" r="12" fill="#fed7aa" />
              <text x="186" y="55" fontSize="18">👋</text>
            </g>

            <circle cx="100" cy="75" r="44" fill="#fed7aa" />
            {/* Goku's Iconic Spiky Hair */}
            <polygon points="50,65 20,25 70,45" fill="#0f172a" />
            <polygon points="85,45 100,0 115,45" fill="#0f172a" />
            <polygon points="130,45 180,25 150,65" fill="#0f172a" />
            <circle cx="80" cy="75" r="6" fill="#0f172a" />
            <circle cx="120" cy="75" r="6" fill="#0f172a" />
            <path d="M 80 94 Q 100 112 120 94 Z" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
          </svg>
        )}

        {/* 6. VEGETA (DRAGON BALL Z) */}
        {isVegeta && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="55" ry="10" fill="rgba(0,0,0,0.15)" />
            {/* White Armor Boots & Blue Jumpsuit */}
            <rect x="75" y="180" width="16" height="102" fill="#1e3a8a" rx="6" />
            <rect x="109" y="180" width="16" height="102" fill="#1e3a8a" rx="6" />
            <ellipse cx="83" cy="280" rx="14" ry="7" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
            <ellipse cx="117" cy="280" rx="14" ry="7" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
            {/* Royal Saiyan Armor */}
            <rect x="60" y="110" width="80" height="75" fill="#ffffff" rx="10" stroke="#eab308" strokeWidth="4" />

            <g className="animate-wave-arm">
              <rect x="135" y="115" width="20" height="60" fill="#ffffff" rx="10" transform="rotate(-130 135 115)" />
              <circle cx="178" cy="68" r="11" fill="#fed7aa" />
              <text x="180" y="55" fontSize="18">👋</text>
            </g>

            <circle cx="100" cy="75" r="42" fill="#fed7aa" />
            {/* Flame Spiky Hair */}
            <polygon points="60,60 100,5 140,60" fill="#0f172a" />
            <circle cx="80" cy="75" r="6" fill="#0f172a" />
            <circle cx="120" cy="75" r="6" fill="#0f172a" />
            <path d="M 85 96 L 115 96" stroke="#0f172a" strokeWidth="3" />
          </svg>
        )}

        {/* 7. PIKACHU (POKÉMON) */}
        {isPikachu && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="55" ry="10" fill="rgba(0,0,0,0.15)" />
            {/* Yellow Feet */}
            <ellipse cx="75" cy="275" rx="20" ry="10" fill="#eab308" />
            <ellipse cx="125" cy="275" rx="20" ry="10" fill="#eab308" />
            {/* Round Body */}
            <circle cx="100" cy="185" r="58" fill="#fde047" />

            {/* Lightning Tail */}
            <polygon points="45,210 20,180 35,180 15,140 50,165" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />

            <g className="animate-wave-arm">
              <rect x="135" y="160" width="18" height="48" fill="#fde047" rx="9" transform="rotate(-135 135 160)" />
              <circle cx="176" cy="115" r="12" fill="#fde047" />
              <text x="178" y="100" fontSize="18">👋</text>
            </g>

            {/* Head & Pointy Ears */}
            <circle cx="100" cy="90" r="52" fill="#fde047" />
            {/* Ears with Black Tips */}
            <polygon points="55,60 25,10 45,55" fill="#fde047" />
            <polygon points="25,10 35,30 45,20" fill="#0f172a" />
            <polygon points="145,60 175,10 155,55" fill="#fde047" />
            <polygon points="175,10 165,30 155,20" fill="#0f172a" />

            {/* Big Eyes & Rosy Cheeks */}
            <circle cx="78" cy="85" r="8" fill="#0f172a" />
            <circle cx="122" cy="85" r="8" fill="#0f172a" />
            <circle cx="80" cy="83" r="3" fill="#ffffff" />
            <circle cx="124" cy="83" r="3" fill="#ffffff" />
            <circle cx="62" cy="102" r="10" fill="#ef4444" />
            <circle cx="138" cy="102" r="10" fill="#ef4444" />
            <path d="M 90 102 Q 100 114 110 102" stroke="#0f172a" strokeWidth="3" fill="none" />
          </svg>
        )}

        {/* 8. MONKEY D. LUFFY */}
        {isLuffy && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="55" ry="8" fill="rgba(0,0,0,0.15)" />
            <rect x="76" y="200" width="16" height="85" fill="#fde047" rx="6" />
            <rect x="108" y="200" width="16" height="85" fill="#fde047" rx="6" />
            <ellipse cx="84" cy="280" rx="14" ry="7" fill="#78350f" />
            <ellipse cx="116" cy="280" rx="14" ry="7" fill="#78350f" />
            <rect x="65" y="170" width="70" height="45" fill="#2563eb" rx="6" />
            <rect x="65" y="165" width="70" height="10" fill="#eab308" rx="4" />
            <rect x="60" y="110" width="80" height="60" fill="#ef4444" rx="10" />

            <g className="animate-wave-arm">
              <rect x="135" y="115" width="20" height="60" fill="#ef4444" rx="10" transform="rotate(-130 135 115)" />
              <circle cx="178" cy="68" r="11" fill="#fef08a" />
              <text x="180" y="55" fontSize="18">👋</text>
            </g>

            <circle cx="100" cy="75" r="42" fill="#fde047" />
            <path d="M 80 82 Q 85 90 82 94" stroke="#ef4444" strokeWidth="2.5" fill="none" />
            <circle cx="80" cy="72" r="5" fill="#0f172a" />
            <circle cx="120" cy="72" r="5" fill="#0f172a" />
            <path d="M 75 92 Q 100 112 125 92 Z" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
            <ellipse cx="100" cy="48" rx="62" ry="12" fill="#eab308" stroke="#ca8a04" strokeWidth="2.5" />
            <rect x="65" y="24" width="70" height="26" fill="#eab308" rx="13" />
            <rect x="65" y="42" width="70" height="8" fill="#ef4444" />
          </svg>
        )}

        {/* 9. NAMI */}
        {isNami && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="50" ry="8" fill="rgba(0,0,0,0.15)" />
            <rect x="78" y="170" width="14" height="115" fill="#1d4ed8" rx="6" />
            <rect x="108" y="170" width="14" height="115" fill="#1d4ed8" rx="6" />
            <ellipse cx="85" cy="280" rx="12" ry="7" fill="#78350f" />
            <ellipse cx="115" cy="280" rx="12" ry="7" fill="#78350f" />
            <rect x="65" y="120" width="70" height="55" fill="#16a34a" rx="10" />

            <g className="animate-wave-arm">
              <rect x="135" y="125" width="18" height="55" fill="#fde047" rx="9" transform="rotate(-130 135 125)" />
              <circle cx="175" cy="77" r="10" fill="#fde047" />
              <text x="178" y="65" fontSize="18">👋</text>
            </g>

            <circle cx="100" cy="75" r="42" fill="#fde047" />
            <path d="M 40 80 C 35 20, 165 20, 160 80 C 130 35, 70 35, 40 80 Z" fill="#ea580c" />
            <path d="M 35 80 L 45 175 M 165 80 L 155 175" stroke="#ea580c" strokeWidth="12" strokeLinecap="round" />
            <circle cx="82" cy="75" r="6" fill="#0f172a" />
            <circle cx="118" cy="75" r="6" fill="#0f172a" />
            <path d="M 86 94 Q 100 108 114 94" stroke="#0f172a" strokeWidth="3" fill="none" />
          </svg>
        )}

        {/* 10. NICO ROBIN */}
        {isRobin && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="50" ry="8" fill="rgba(0,0,0,0.15)" />
            <rect x="78" y="190" width="14" height="95" fill="#fde047" rx="6" />
            <rect x="108" y="190" width="14" height="95" fill="#fde047" rx="6" />
            <ellipse cx="85" cy="280" rx="12" ry="7" fill="#0f172a" />
            <ellipse cx="115" cy="280" rx="12" ry="7" fill="#0f172a" />
            <path d="M 65 130 L 55 200 L 145 200 L 135 130 Z" fill="#6b21a8" />

            <g className="animate-wave-arm">
              <rect x="135" y="130" width="18" height="55" fill="#fde047" rx="9" transform="rotate(-130 135 130)" />
              <circle cx="175" cy="82" r="10" fill="#fde047" />
              <text x="178" y="70" fontSize="18">👋</text>
            </g>

            <circle cx="100" cy="75" r="42" fill="#fde047" />
            <path d="M 45 75 C 40 25, 160 25, 155 75 C 130 35, 70 35, 45 75 Z" fill="#0f172a" />
            <circle cx="82" cy="75" r="6" fill="#0f172a" />
            <circle cx="118" cy="75" r="6" fill="#0f172a" />
            <path d="M 86 94 Q 100 108 114 94" stroke="#0f172a" strokeWidth="3" fill="none" />
          </svg>
        )}

        {/* 11. SANJI */}
        {isSanji && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="50" ry="8" fill="rgba(0,0,0,0.15)" />
            <rect x="75" y="180" width="16" height="105" fill="#0f172a" rx="6" />
            <rect x="109" y="180" width="16" height="105" fill="#0f172a" rx="6" />
            <ellipse cx="83" cy="280" rx="14" ry="7" fill="#0f172a" />
            <ellipse cx="117" cy="280" rx="14" ry="7" fill="#0f172a" />
            <rect x="65" y="120" width="70" height="65" fill="#1e293b" rx="10" />
            <polygon points="100,120 92,150 108,150" fill="#dc2626" />

            <g className="animate-wave-arm">
              <rect x="135" y="125" width="20" height="60" fill="#1e293b" rx="10" transform="rotate(-130 135 125)" />
              <circle cx="178" cy="77" r="10" fill="#fde047" />
              <text x="180" y="65" fontSize="18">👋</text>
            </g>

            <circle cx="100" cy="75" r="42" fill="#fde047" />
            <path d="M 50 70 C 45 25, 155 25, 150 70 C 130 40, 90 40, 50 70 Z" fill="#fde047" />
            <path d="M 50 70 Q 85 85 95 95 Z" fill="#fef08a" />
            <circle cx="118" cy="75" r="5" fill="#0f172a" />
            <path d="M 85 98 L 115 98" stroke="#0f172a" strokeWidth="3" />
          </svg>
        )}

        {/* 12. RORONOA ZORO */}
        {isZoro && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="55" ry="8" fill="rgba(0,0,0,0.15)" />
            <rect x="75" y="210" width="16" height="75" fill="#0f172a" rx="6" />
            <rect x="109" y="210" width="16" height="75" fill="#0f172a" rx="6" />
            <ellipse cx="83" cy="280" rx="14" ry="7" fill="#0f172a" />
            <ellipse cx="117" cy="280" rx="14" ry="7" fill="#0f172a" />
            <rect x="65" y="115" width="70" height="110" fill="#065f46" rx="12" />
            <rect x="65" y="160" width="70" height="20" fill="#047857" />
            <line x1="45" y1="140" x2="135" y2="220" stroke="#e2e8f0" strokeWidth="5" />
            <line x1="40" y1="150" x2="130" y2="230" stroke="#e2e8f0" strokeWidth="5" />
            <line x1="35" y1="160" x2="125" y2="240" stroke="#eab308" strokeWidth="5" />

            <g className="animate-wave-arm">
              <rect x="135" y="120" width="22" height="60" fill="#065f46" rx="10" transform="rotate(-130 135 120)" />
              <circle cx="178" cy="73" r="11" fill="#fde047" />
              <text x="180" y="60" fontSize="18">👋</text>
            </g>

            <circle cx="100" cy="75" r="42" fill="#fde047" />
            <path d="M 52 70 C 45 25, 155 25, 148 70 Z" fill="#16a34a" />
            <line x1="75" y1="65" x2="85" y2="85" stroke="#ef4444" strokeWidth="2.5" />
            <circle cx="118" cy="75" r="5" fill="#0f172a" />
            <path d="M 85 95 L 115 95" stroke="#0f172a" strokeWidth="3" />
          </svg>
        )}

        {/* 13. SHINCHAN NOHARA */}
        {isShinchan && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="50" ry="8" fill="rgba(0,0,0,0.15)" />
            <rect x="75" y="210" width="16" height="72" fill="#fde047" rx="6" />
            <rect x="109" y="210" width="16" height="72" fill="#fde047" rx="6" />
            <ellipse cx="83" cy="280" rx="14" ry="7" fill="#eab308" />
            <ellipse cx="117" cy="280" rx="14" ry="7" fill="#eab308" />
            <rect x="65" y="170" width="70" height="45" fill="#fde047" rx="8" />
            <rect x="60" y="110" width="80" height="65" fill="#ef4444" rx="10" />

            <g className="animate-wave-arm">
              <rect x="135" y="115" width="20" height="60" fill="#ef4444" rx="10" transform="rotate(-130 135 115)" />
              <circle cx="178" cy="68" r="11" fill="#fef08a" />
              <text x="180" y="55" fontSize="18">👋</text>
            </g>

            <ellipse cx="100" cy="75" rx="48" ry="38" fill="#fde047" />
            <path d="M 60 54 Q 80 42 95 56" stroke="#0f172a" strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M 105 56 Q 120 42 140 54" stroke="#0f172a" strokeWidth="7" fill="none" strokeLinecap="round" />
            <circle cx="78" cy="68" r="9" fill="#0f172a" />
            <circle cx="122" cy="68" r="9" fill="#0f172a" />
            <circle cx="76" cy="66" r="3" fill="#ffffff" />
            <circle cx="120" cy="66" r="3" fill="#ffffff" />
            <path d="M 80 90 Q 100 108 120 90 Z" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
          </svg>
        )}

        {/* 14. TORU KAZAMA */}
        {isKazama && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="50" ry="8" fill="rgba(0,0,0,0.15)" />
            <rect x="75" y="180" width="16" height="102" fill="#1e3a8a" rx="6" />
            <rect x="109" y="180" width="16" height="102" fill="#1e3a8a" rx="6" />
            <ellipse cx="83" cy="280" rx="14" ry="7" fill="#0f172a" />
            <ellipse cx="117" cy="280" rx="14" ry="7" fill="#0f172a" />
            <rect x="65" y="120" width="70" height="65" fill="#1d4ed8" rx="12" />
            <polygon points="100,120 90,150 110,150" fill="#ef4444" />

            <g className="animate-wave-arm">
              <rect x="135" y="125" width="20" height="60" fill="#1d4ed8" rx="10" transform="rotate(-130 135 125)" />
              <circle cx="178" cy="77" r="10" fill="#fde047" />
              <text x="180" y="65" fontSize="18">👋</text>
            </g>

            <circle cx="100" cy="75" r="42" fill="#fde047" />
            <path d="M 50 70 C 45 30, 155 30, 150 70 Z" fill="#1e3a8a" />
            <circle cx="80" cy="73" r="6" fill="#0f172a" />
            <circle cx="120" cy="73" r="6" fill="#0f172a" />
            <path d="M 85 92 Q 100 104 115 92" stroke="#0f172a" strokeWidth="3" fill="none" />
          </svg>
        )}

        {/* 15. NENE SAKURADA (NANI) */}
        {isNene && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="50" ry="8" fill="rgba(0,0,0,0.15)" />
            <rect x="78" y="190" width="14" height="92" fill="#fbcfe8" rx="6" />
            <rect x="108" y="190" width="14" height="92" fill="#fbcfe8" rx="6" />
            <ellipse cx="85" cy="280" rx="12" ry="7" fill="#ec4899" />
            <ellipse cx="115" cy="280" rx="12" ry="7" fill="#ec4899" />
            <path d="M 65 130 L 45 200 L 155 200 L 135 130 Z" fill="#f43f5e" />

            <g className="animate-wave-arm">
              <rect x="135" y="130" width="18" height="55" fill="#f43f5e" rx="9" transform="rotate(-130 135 130)" />
              <circle cx="175" cy="82" r="10" fill="#fde047" />
              <text x="178" y="70" fontSize="18">👋</text>
            </g>

            <circle cx="100" cy="75" r="42" fill="#fde047" />
            <polygon points="100,35 70,20 85,45" fill="#ef4444" />
            <polygon points="100,35 130,20 115,45" fill="#ef4444" />
            <circle cx="80" cy="73" r="7" fill="#0f172a" />
            <circle cx="120" cy="73" r="7" fill="#0f172a" />
            <path d="M 85 95 Q 100 108 115 95" stroke="#0f172a" strokeWidth="3" fill="none" />
          </svg>
        )}

        {/* 16. BOO-CHAN */}
        {isBochan && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="50" ry="8" fill="rgba(0,0,0,0.15)" />
            <rect x="75" y="180" width="16" height="102" fill="#16a34a" rx="6" />
            <rect x="109" y="180" width="16" height="102" fill="#16a34a" rx="6" />
            <ellipse cx="83" cy="280" rx="14" ry="7" fill="#14532d" />
            <ellipse cx="117" cy="280" rx="14" ry="7" fill="#14532d" />
            <rect x="65" y="120" width="70" height="65" fill="#22c55e" rx="12" />

            <g className="animate-wave-arm">
              <rect x="135" y="125" width="20" height="60" fill="#22c55e" rx="10" transform="rotate(-130 135 125)" />
              <circle cx="178" cy="77" r="10" fill="#fde047" />
              <text x="180" y="65" fontSize="18">👋</text>
            </g>

            <ellipse cx="100" cy="75" rx="40" ry="48" fill="#fde047" />
            <path d="M 100 80 Q 96 102 100 112 Q 104 102 100 80 Z" fill="#38bdf8" opacity="0.9" />
            <circle cx="82" cy="68" r="5" fill="#0f172a" />
            <circle cx="118" cy="68" r="5" fill="#0f172a" />
          </svg>
        )}

        {/* 17. MASAO SATO */}
        {isMasao && (
          <svg viewBox="0 0 200 320" className="h-full drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="50" ry="8" fill="rgba(0,0,0,0.15)" />
            <rect x="75" y="180" width="16" height="102" fill="#22c55e" rx="6" />
            <rect x="109" y="180" width="16" height="102" fill="#22c55e" rx="6" />
            <ellipse cx="83" cy="280" rx="14" ry="7" fill="#15803d" />
            <ellipse cx="117" cy="280" rx="14" ry="7" fill="#15803d" />
            <rect x="65" y="120" width="70" height="65" fill="#86efac" rx="12" />

            <g className="animate-wave-arm">
              <rect x="135" y="125" width="20" height="60" fill="#86efac" rx="10" transform="rotate(-130 135 125)" />
              <circle cx="178" cy="77" r="10" fill="#fde047" />
              <text x="180" y="65" fontSize="18">👋</text>
            </g>

            <circle cx="100" cy="75" r="44" fill="#fde047" />
            <circle cx="80" cy="70" r="6" fill="#0f172a" />
            <circle cx="120" cy="70" r="6" fill="#0f172a" />
            <path d="M 85 98 Q 100 88 115 98" stroke="#0f172a" strokeWidth="3" fill="none" />
          </svg>
        )}

        {/* 18. HIMAWARI NOHARA */}
        {isHimawari && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="45" ry="8" fill="rgba(0,0,0,0.15)" />
            <ellipse cx="100" cy="205" rx="42" ry="46" fill="#fde047" />
            <rect x="80" y="240" width="14" height="42" fill="#fde047" rx="6" />
            <rect x="106" y="240" width="14" height="42" fill="#fde047" rx="6" />

            <g className="animate-wave-arm">
              <rect x="130" y="170" width="16" height="45" fill="#fde047" rx="8" transform="rotate(-130 130 170)" />
              <circle cx="165" cy="130" r="9" fill="#fef08a" />
              <text x="168" y="118" fontSize="18">👋</text>
            </g>

            <circle cx="100" cy="120" r="38" fill="#fef08a" />
            <circle cx="100" cy="75" r="14" fill="#f97316" />
            <circle cx="86" cy="85" r="10" fill="#f97316" />
            <circle cx="114" cy="85" r="10" fill="#f97316" />
            <circle cx="84" cy="118" r="7" fill="#0f172a" />
            <circle cx="116" cy="118" r="7" fill="#0f172a" />
          </svg>
        )}

        {/* 19. NOBITA NOBI */}
        {isNobita && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="55" ry="8" fill="rgba(0,0,0,0.15)" />
            <rect x="75" y="200" width="16" height="85" fill="#3b82f6" rx="6" />
            <rect x="109" y="200" width="16" height="85" fill="#3b82f6" rx="6" />
            <ellipse cx="83" cy="280" rx="14" ry="7" fill="#1e293b" />
            <ellipse cx="117" cy="280" rx="14" ry="7" fill="#1e293b" />
            <rect x="65" y="125" width="70" height="85" fill="#eab308" rx="12" />
            <path d="M 65 125 L 100 145 L 135 125" stroke="#ca8a04" strokeWidth="3" fill="none" />

            <g className="animate-wave-arm">
              <rect x="135" y="125" width="22" height="65" fill="#eab308" rx="10" transform="rotate(-130 135 125)" />
              <circle cx="178" cy="77" r="11" fill="#fde047" />
              <text x="180" y="65" fontSize="18">👋</text>
            </g>

            <circle cx="100" cy="75" r="44" fill="#fef08a" />
            <path d="M 52 70 C 50 30, 150 30, 148 70 Z" fill="#1e293b" />
            <circle cx="82" cy="75" r="16" fill="none" stroke="#0f172a" strokeWidth="3.5" />
            <circle cx="118" cy="75" r="16" fill="none" stroke="#0f172a" strokeWidth="3.5" />
            <circle cx="82" cy="75" r="4" fill="#0f172a" />
            <circle cx="118" cy="75" r="4" fill="#0f172a" />
            <path d="M 85 98 Q 100 110 115 98" stroke="#0f172a" strokeWidth="3.5" fill="none" />
          </svg>
        )}

        {/* 20. DORAEMON */}
        {isDoraemon && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="55" ry="10" fill="rgba(0,0,0,0.15)" />
            <ellipse cx="75" cy="270" rx="22" ry="12" fill="#ffffff" stroke="#0284c7" strokeWidth="3" />
            <ellipse cx="125" cy="270" rx="22" ry="12" fill="#ffffff" stroke="#0284c7" strokeWidth="3" />
            <circle cx="100" cy="180" r="55" fill="#0284c7" />
            <circle cx="100" cy="185" r="40" fill="#ffffff" />
            <path d="M 72 185 A 28 28 0 0 0 128 185 Z" fill="#ffffff" stroke="#0284c7" strokeWidth="3" />
            <rect x="68" y="128" width="64" height="12" fill="#ef4444" rx="6" />
            <circle cx="100" cy="140" r="9" fill="#eab308" />

            <g className="animate-wave-arm">
              <rect x="135" y="145" width="20" height="50" fill="#0284c7" rx="10" transform="rotate(-135 135 145)" />
              <circle cx="178" cy="100" r="14" fill="#ffffff" stroke="#0284c7" strokeWidth="3" />
              <text x="180" y="85" fontSize="18">👋</text>
            </g>

            <circle cx="100" cy="80" r="52" fill="#0284c7" />
            <ellipse cx="100" cy="88" rx="40" ry="34" fill="#ffffff" />
            <circle cx="100" cy="70" r="7" fill="#ef4444" />
            <ellipse cx="90" cy="58" rx="7" ry="10" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <ellipse cx="110" cy="58" rx="7" ry="10" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <circle cx="92" cy="60" r="3" fill="#0f172a" />
            <circle cx="108" cy="60" r="3" fill="#0f172a" />
            <path d="M 78 98 Q 100 118 122 98" stroke="#0f172a" strokeWidth="3" fill="none" />
          </svg>
        )}

        {/* 21. SHIZUKA MINAMOTO */}
        {isShizuka && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="50" ry="8" fill="rgba(0,0,0,0.15)" />
            <rect x="78" y="195" width="14" height="90" fill="#fbcfe8" rx="6" />
            <rect x="108" y="195" width="14" height="90" fill="#fbcfe8" rx="6" />
            <ellipse cx="85" cy="280" rx="12" ry="7" fill="#ec4899" />
            <ellipse cx="115" cy="280" rx="12" ry="7" fill="#ec4899" />
            <path d="M 65 135 L 45 205 L 155 205 L 135 135 Z" fill="#ec4899" />

            <g className="animate-wave-arm">
              <rect x="135" y="135" width="18" height="55" fill="#fbcfe8" rx="9" transform="rotate(-130 135 135)" />
              <circle cx="175" cy="87" r="10" fill="#fef08a" />
              <text x="178" y="75" fontSize="18">👋</text>
            </g>

            <circle cx="100" cy="75" r="42" fill="#fde047" />
            <ellipse cx="50" cy="75" rx="14" ry="22" fill="#1e293b" />
            <ellipse cx="150" cy="75" rx="14" ry="22" fill="#1e293b" />
            <path d="M 55 70 C 50 30, 150 30, 145 70 Z" fill="#1e293b" />
            <ellipse cx="82" cy="75" rx="7" ry="11" fill="#0f172a" />
            <ellipse cx="118" cy="75" rx="7" ry="11" fill="#0f172a" />
            <path d="M 88 95 Q 100 106 112 95" stroke="#ec4899" strokeWidth="3" fill="none" />
          </svg>
        )}

        {/* 22. DORAMI */}
        {isDorami && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="55" ry="10" fill="rgba(0,0,0,0.15)" />
            <ellipse cx="75" cy="270" rx="22" ry="12" fill="#ffffff" stroke="#eab308" strokeWidth="3" />
            <ellipse cx="125" cy="270" rx="22" ry="12" fill="#ffffff" stroke="#eab308" strokeWidth="3" />
            <circle cx="100" cy="180" r="52" fill="#eab308" />
            <circle cx="100" cy="185" r="38" fill="#ffffff" />
            <polygon points="100,35 60,15 75,45" fill="#ef4444" />
            <polygon points="100,35 140,15 125,45" fill="#ef4444" />

            <g className="animate-wave-arm">
              <rect x="135" y="150" width="18" height="48" fill="#eab308" rx="9" transform="rotate(-135 135 150)" />
              <circle cx="176" cy="105" r="14" fill="#ffffff" stroke="#eab308" strokeWidth="3" />
              <text x="178" y="90" fontSize="18">👋</text>
            </g>

            <circle cx="100" cy="75" r="48" fill="#eab308" />
            <ellipse cx="100" cy="83" rx="36" ry="30" fill="#ffffff" />
            <circle cx="100" cy="65" r="6" fill="#ef4444" />
            <ellipse cx="90" cy="54" rx="6" ry="10" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <ellipse cx="110" cy="54" rx="6" ry="10" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <path d="M 78 92 Q 100 112 122 92" stroke="#0f172a" strokeWidth="3" fill="none" />
          </svg>
        )}

        {/* 23. SUNIO HONEKAWA */}
        {isSunio && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="50" ry="8" fill="rgba(0,0,0,0.15)" />
            <rect x="75" y="180" width="16" height="102" fill="#0284c7" rx="6" />
            <rect x="109" y="180" width="16" height="102" fill="#0284c7" rx="6" />
            <ellipse cx="83" cy="280" rx="14" ry="7" fill="#0369a1" />
            <ellipse cx="117" cy="280" rx="14" ry="7" fill="#0369a1" />
            <rect x="65" y="125" width="70" height="65" fill="#0284c7" rx="12" />

            <g className="animate-wave-arm">
              <rect x="135" y="125" width="20" height="60" fill="#0284c7" rx="10" transform="rotate(-130 135 125)" />
              <circle cx="178" cy="77" r="10" fill="#fde047" />
              <text x="180" y="65" fontSize="18">👋</text>
            </g>

            <circle cx="100" cy="75" r="42" fill="#fde047" />
            <polygon points="60,55 40,15 80,40" fill="#1e293b" />
            <polygon points="90,40 100,5 120,40" fill="#1e293b" />
            <polygon points="120,40 150,15 140,60" fill="#1e293b" />
            <polygon points="100,80 128,84 100,92" fill="#f59e0b" />
            <ellipse cx="80" cy="70" rx="6" ry="10" fill="#0f172a" />
            <ellipse cx="115" cy="70" rx="6" ry="10" fill="#0f172a" />
          </svg>
        )}

        {/* 24. GIAN (GEIN) */}
        {isGian && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="60" ry="12" fill="rgba(0,0,0,0.15)" />
            <rect x="70" y="200" width="22" height="85" fill="#d97706" rx="8" />
            <rect x="108" y="200" width="22" height="85" fill="#d97706" rx="8" />
            <ellipse cx="81" cy="280" rx="16" ry="9" fill="#78350f" />
            <ellipse cx="119" cy="280" rx="16" ry="9" fill="#78350f" />
            <rect x="50" y="120" width="100" height="95" fill="#f97316" rx="16" />
            <path d="M 50 160 L 75 180 L 100 160 L 125 180 L 150 160" stroke="#fde047" strokeWidth="8" fill="none" />

            <g className="animate-wave-arm">
              <rect x="145" y="125" width="24" height="65" fill="#f97316" rx="12" transform="rotate(-130 145 125)" />
              <circle cx="190" cy="75" r="14" fill="#fed7aa" />
              <text x="192" y="60" fontSize="20">👋</text>
            </g>

            <circle cx="100" cy="75" r="46" fill="#fed7aa" />
            <path d="M 50 70 C 45 25, 155 25, 150 70 Z" fill="#1e293b" />
            <circle cx="78" cy="75" r="6" fill="#0f172a" />
            <circle cx="122" cy="75" r="6" fill="#0f172a" />
            <path d="M 80 98 Q 100 114 120 98" stroke="#0f172a" strokeWidth="4" fill="none" />
          </svg>
        )}

        {/* 25. HARRY POTTER */}
        {isHarry && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="55" ry="8" fill="rgba(0,0,0,0.15)" />
            <rect x="75" y="210" width="16" height="75" fill="#0f172a" rx="6" />
            <rect x="109" y="210" width="16" height="75" fill="#0f172a" rx="6" />
            <ellipse cx="83" cy="280" rx="14" ry="7" fill="#0f172a" />
            <ellipse cx="117" cy="280" rx="14" ry="7" fill="#0f172a" />
            <path d="M 60 120 L 40 260 L 160 260 L 140 120 Z" fill="#0f172a" />
            <rect x="75" y="120" width="50" height="140" fill="#1e293b" />
            <rect x="72" y="115" width="56" height="16" fill="#7f1d1d" rx="4" />
            <line x1="86" y1="115" x2="86" y2="131" stroke="#eab308" strokeWidth="5" />
            <line x1="114" y1="115" x2="114" y2="131" stroke="#eab308" strokeWidth="5" />

            <g className="animate-wave-arm">
              <rect x="140" y="125" width="20" height="60" fill="#0f172a" rx="10" transform="rotate(-130 140 125)" />
              <circle cx="182" cy="78" r="10" fill="#fde047" />
              <text x="185" y="65" fontSize="18">👋</text>
            </g>

            <circle cx="100" cy="75" r="42" fill="#fef08a" />
            <path d="M 52 70 C 45 30, 155 30, 148 70 Z" fill="#0f172a" />
            <circle cx="82" cy="75" r="15" fill="none" stroke="#0f172a" strokeWidth="3" />
            <circle cx="118" cy="75" r="15" fill="none" stroke="#0f172a" strokeWidth="3" />
            <circle cx="82" cy="75" r="4" fill="#0f172a" />
            <circle cx="118" cy="75" r="4" fill="#0f172a" />
            <path d="M 92 45 L 96 53 L 93 54 L 97 62" stroke="#ef4444" strokeWidth="2.5" fill="none" />
            <path d="M 86 92 Q 100 104 114 92" stroke="#0f172a" strokeWidth="3" fill="none" />
          </svg>
        )}

        {/* 26. HERMIONE GRANGER */}
        {isHermione && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="55" ry="8" fill="rgba(0,0,0,0.15)" />
            <rect x="78" y="210" width="14" height="75" fill="#fde047" rx="6" />
            <rect x="108" y="210" width="14" height="75" fill="#fde047" rx="6" />
            <ellipse cx="85" cy="280" rx="12" ry="7" fill="#0f172a" />
            <ellipse cx="115" cy="280" rx="12" ry="7" fill="#0f172a" />
            <path d="M 60 120 L 40 260 L 160 260 L 140 120 Z" fill="#0f172a" />
            <rect x="75" y="120" width="50" height="140" fill="#1e293b" />
            <rect x="72" y="115" width="56" height="16" fill="#7f1d1d" rx="4" />
            <line x1="86" y1="115" x2="86" y2="131" stroke="#eab308" strokeWidth="5" />
            <line x1="114" y1="115" x2="114" y2="131" stroke="#eab308" strokeWidth="5" />

            <g className="animate-wave-arm">
              <rect x="140" y="125" width="20" height="60" fill="#0f172a" rx="10" transform="rotate(-130 140 125)" />
              <circle cx="182" cy="78" r="10" fill="#fde047" />
              <text x="185" y="65" fontSize="18">👋</text>
            </g>

            <circle cx="100" cy="75" r="42" fill="#fef08a" />
            <path d="M 40 85 C 35 25, 165 25, 160 85 Z" fill="#78350f" />
            <circle cx="82" cy="75" r="5" fill="#0f172a" />
            <circle cx="118" cy="75" r="5" fill="#0f172a" />
            <path d="M 86 92 Q 100 104 114 92" stroke="#0f172a" strokeWidth="3" fill="none" />
          </svg>
        )}

        {/* 27. RON WEASLEY */}
        {isRon && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="55" ry="8" fill="rgba(0,0,0,0.15)" />
            <rect x="75" y="210" width="16" height="75" fill="#0f172a" rx="6" />
            <rect x="109" y="210" width="16" height="75" fill="#0f172a" rx="6" />
            <ellipse cx="83" cy="280" rx="14" ry="7" fill="#0f172a" />
            <ellipse cx="117" cy="280" rx="14" ry="7" fill="#0f172a" />
            <path d="M 60 120 L 40 260 L 160 260 L 140 120 Z" fill="#0f172a" />
            <rect x="75" y="120" width="50" height="140" fill="#1e293b" />
            <rect x="72" y="115" width="56" height="16" fill="#7f1d1d" rx="4" />
            <line x1="86" y1="115" x2="86" y2="131" stroke="#eab308" strokeWidth="5" />
            <line x1="114" y1="115" x2="114" y2="131" stroke="#eab308" strokeWidth="5" />

            <g className="animate-wave-arm">
              <rect x="140" y="125" width="20" height="60" fill="#0f172a" rx="10" transform="rotate(-130 140 125)" />
              <circle cx="182" cy="78" r="10" fill="#fde047" />
              <text x="185" y="65" fontSize="18">👋</text>
            </g>

            <circle cx="100" cy="75" r="42" fill="#fef08a" />
            <path d="M 50 70 C 45 25, 155 25, 150 70 Z" fill="#ea580c" />
            <circle cx="82" cy="75" r="5" fill="#0f172a" />
            <circle cx="118" cy="75" r="5" fill="#0f172a" />
            <path d="M 86 92 Q 100 104 114 92" stroke="#0f172a" strokeWidth="3" fill="none" />
          </svg>
        )}

        {/* 28. DRACO MALFOY */}
        {isDraco && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="55" ry="8" fill="rgba(0,0,0,0.15)" />
            <rect x="75" y="210" width="16" height="75" fill="#0f172a" rx="6" />
            <rect x="109" y="210" width="16" height="75" fill="#0f172a" rx="6" />
            <ellipse cx="83" cy="280" rx="14" ry="7" fill="#0f172a" />
            <ellipse cx="117" cy="280" rx="14" ry="7" fill="#0f172a" />
            <path d="M 60 120 L 40 260 L 160 260 L 140 120 Z" fill="#0f172a" />
            <rect x="75" y="120" width="50" height="140" fill="#064e3b" />
            <rect x="72" y="115" width="56" height="16" fill="#047857" rx="4" />
            <line x1="86" y1="115" x2="86" y2="131" stroke="#e2e8f0" strokeWidth="5" />
            <line x1="114" y1="115" x2="114" y2="131" stroke="#e2e8f0" strokeWidth="5" />

            <g className="animate-wave-arm">
              <rect x="140" y="125" width="20" height="60" fill="#0f172a" rx="10" transform="rotate(-130 140 125)" />
              <circle cx="182" cy="78" r="10" fill="#fde047" />
              <text x="185" y="65" fontSize="18">👋</text>
            </g>

            <circle cx="100" cy="75" r="42" fill="#fde047" />
            <path d="M 52 65 C 48 20, 152 20, 148 65 Z" fill="#fef08a" />
            <circle cx="82" cy="75" r="5" fill="#0f172a" />
            <circle cx="118" cy="75" r="5" fill="#0f172a" />
            <line x1="88" y1="95" x2="112" y2="95" stroke="#0f172a" strokeWidth="3" />
          </svg>
        )}

        {/* 29. HEDWIG */}
        {isHedwig && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="50" ry="10" fill="rgba(0,0,0,0.15)" />
            <rect x="40" y="270" width="120" height="14" fill="#78350f" rx="6" />
            <ellipse cx="100" cy="190" rx="45" ry="65" fill="#ffffff" stroke="#e2e8f0" strokeWidth="3" />

            <g className="animate-wave-arm">
              <ellipse cx="145" cy="170" rx="18" ry="45" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" transform="rotate(-40 145 170)" />
              <text x="175" y="110" fontSize="18">👋</text>
            </g>

            <circle cx="100" cy="105" r="42" fill="#ffffff" stroke="#e2e8f0" strokeWidth="3" />
            <circle cx="82" cy="100" r="14" fill="#fde047" stroke="#0f172a" strokeWidth="2.5" />
            <circle cx="118" cy="100" r="14" fill="#fde047" stroke="#0f172a" strokeWidth="2.5" />
            <circle cx="82" cy="100" r="5" fill="#0f172a" />
            <circle cx="118" cy="100" r="5" fill="#0f172a" />
            <polygon points="100,105 94,118 106,118" fill="#334155" />
          </svg>
        )}

        {/* 30. CEDRIC DIGGORY */}
        {isCedric && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="55" ry="8" fill="rgba(0,0,0,0.15)" />
            <rect x="75" y="210" width="16" height="75" fill="#0f172a" rx="6" />
            <rect x="109" y="210" width="16" height="75" fill="#0f172a" rx="6" />
            <ellipse cx="83" cy="280" rx="14" ry="7" fill="#0f172a" />
            <ellipse cx="117" cy="280" rx="14" ry="7" fill="#0f172a" />
            <path d="M 60 120 L 40 260 L 160 260 L 140 120 Z" fill="#0f172a" />
            <rect x="75" y="120" width="50" height="140" fill="#eab308" />
            <rect x="72" y="115" width="56" height="16" fill="#ca8a04" rx="4" />
            <line x1="86" y1="115" x2="86" y2="131" stroke="#0f172a" strokeWidth="5" />
            <line x1="114" y1="115" x2="114" y2="131" stroke="#0f172a" strokeWidth="5" />

            <g className="animate-wave-arm">
              <rect x="140" y="125" width="20" height="60" fill="#0f172a" rx="10" transform="rotate(-130 140 125)" />
              <circle cx="182" cy="78" r="10" fill="#fde047" />
              <text x="185" y="65" fontSize="18">👋</text>
            </g>

            <circle cx="100" cy="75" r="42" fill="#fde047" />
            <path d="M 50 68 C 45 25, 155 25, 150 68 Z" fill="#78350f" />
            <circle cx="82" cy="75" r="5" fill="#0f172a" />
            <circle cx="118" cy="75" r="5" fill="#0f172a" />
            <path d="M 86 92 Q 100 104 114 92" stroke="#0f172a" strokeWidth="3" fill="none" />
          </svg>
        )}

        {/* CUSTOM OR FALLBACK STANDING MASCOT */}
        {isCustomOrFallback && (
          <svg viewBox="0 0 200 320" className="h-full w-auto drop-shadow-md overflow-visible">
            <ellipse cx="100" cy="285" rx="50" ry="8" fill="rgba(0,0,0,0.15)" />
            <rect x="75" y="200" width="16" height="85" fill="#6366f1" rx="6" />
            <rect x="109" y="200" width="16" height="85" fill="#6366f1" rx="6" />
            <rect x="65" y="125" width="70" height="85" fill="#a855f7" rx="12" />

            <g className="animate-wave-arm">
              <rect x="135" y="125" width="20" height="60" fill="#a855f7" rx="10" transform="rotate(-130 135 125)" />
              <circle cx="178" cy="77" r="10" fill="#fde047" />
              <text x="180" y="65" fontSize="18">👋</text>
            </g>

            <circle cx="100" cy="75" r="42" fill="#fde047" />
            <circle cx="80" cy="70" r="6" fill="#0f172a" />
            <circle cx="120" cy="70" r="6" fill="#0f172a" />
            <path d="M 85 95 Q 100 108 115 95" stroke="#0f172a" strokeWidth="3" fill="none" />
          </svg>
        )}

      </div>

      {/* Character Name Tag */}
      <div className="mt-1 text-center bg-white/90 px-3 py-1 rounded-full border border-stone-200 shadow-sm z-10">
        <div className="text-[11px] font-black text-stone-900 leading-tight">{character?.name || 'Standing Mascot'}</div>
        <div className="text-[9px] text-orange-600 font-mono font-extrabold uppercase tracking-wide">
          {character?.universe || 'Fictional Hero'} • Standing & Waving 👋
        </div>
      </div>
    </div>
  );
}
