import React, { useRef, useState, useEffect } from "react";
import Confetti from "react-confetti";

const App = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [theme, setTheme] = useState("default");
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // 🖥️ Track window size for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔊 Play/Pause Audio
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  // 🎇 Theme selection (only Ajith)
  useEffect(() => {
    const key = keyword.toLowerCase();
    if (key.includes("ajith")) {
      setTheme("fireworks");
      setShowConfetti(true);
    } else {
      setTheme("default");
      setShowConfetti(false);
    }
  }, [keyword]);

  // 🎨 Theme Styles
  const themeStyles = {
    default: {
      backgroundColor: "#f4f4f4",
      color: "#333",
    },
    fireworks: {
      background: "radial-gradient(circle at center, #ff6600, #ff0000, #000)",
      color: "#fff",
      animation: "pulse 1.5s infinite alternate",
    },
  };

  // 🎉 Greeting Message
  const getGreeting = () => {
    const key = keyword.toLowerCase();
    if (key.includes("ajith")) return "🎆 Welcome Ajith! Let’s Celebrate!";
    return "Type the keyword: 'ajith'";
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: windowSize.width < 600 ? "10px" : "20px",
        minHeight: "100vh",
        transition: "all 0.5s ease",
        ...themeStyles[theme],
      }}
    >
      <style>
        {`
          @keyframes pulse {
            0% { filter: brightness(1); }
            50% { filter: brightness(2); }
            100% { filter: brightness(1); }
          }
        `}
      </style>

      {/* 🎇 Confetti Effect */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={true}
          numberOfPieces={200}
        />
      )}

      <h1
        style={{
          marginBottom: "20px",
          fontSize: windowSize.width < 480 ? "1.6rem" : "2rem",
        }}
      >
        🎊 Celebration App 🎶
      </h1>

      {/* 🔍 Input */}
      <input
        type="text"
        placeholder="Type keyword (ajith)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{
          padding: "10px 15px",
          fontSize: windowSize.width < 480 ? "14px" : "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "20px",
          width: "90%",
          maxWidth: "400px",
        }}
      />

      {/* 🖼️ Image */}
      <div>
        <img
          src="image/WhatsApp Image 2025-11-13 at 17.19.46_54e1092a.jpg"
          alt="Celebration"
          style={{
            width: "100%",
            maxWidth: windowSize.width < 768 ? "90%" : "600px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
            marginBottom: "20px",
            objectFit: "cover",
          }}
        />
      </div>

      {/* 🎉 Greeting */}
      <h2
        style={{
          marginBottom: "20px",
          fontSize: windowSize.width < 480 ? "1.2rem" : "1.5rem",
        }}
      >
        {getGreeting()}
      </h2>

      {/* 🎵 Button */}
      <button
        onClick={handlePlayPause}
        style={{
          backgroundColor: isPlaying ? "#d9534f" : "#5cb85c",
          color: "white",
          padding: windowSize.width < 480 ? "8px 16px" : "10px 20px",
          fontSize: windowSize.width < 480 ? "14px" : "16px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        {isPlaying ? "Pause Song" : "Play Song"}
      </button>

      {/* 🎧 Audio */}
      <audio
        ref={audioRef}
        src="https://drive.google.com/file/d/1iC4ZcEeC7gLytGOzO5aGMD01BFJu6oYn/view?usp=drivesdk"
      />
    </div>
  );
};

export default App;
