import { useEffect, useState } from "react";

interface Bubble {
  id: number;
  size: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
}

export const FloatingBubbles = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const colors = [
      "rgba(255, 255, 153, 0.5)",
      "rgba(153, 255, 153, 0.5)",
    ];

    const createBubble = (id: number): Bubble => ({
      id,
      size: Math.random() * 60 + 20,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    const initialBubbles = Array.from({ length: 15 }, (_, i) => createBubble(i));
    setBubbles(initialBubbles);

    const interval = setInterval(() => {
      setBubbles(prev => {
        const newBubbles = [...prev];
        const bubbleToReplace = newBubbles.findIndex(
          b => b.delay + b.duration < Date.now() / 1000
        );
        if (bubbleToReplace >= 0) {
          newBubbles[bubbleToReplace] = createBubble(Date.now());
        }
        return newBubbles;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="absolute rounded-full animate-float"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            backgroundColor: bubble.color,
            animation: `float ${bubble.duration}s linear ${bubble.delay}s infinite`,
            bottom: "-10%",
          }}
        />
      ))}
    </div>
  );
};