import React, { useRef, useEffect } from "react";

export function DarkVeilBackground({
  hueShift = 20,
  noiseIntensity = 0.05,
  scanlineIntensity = 0.2,
  scanlineFrequency = 2.0,
  warpAmount = 0.5,
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frame = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      frame++;
      const { width, height } = canvas;

      ctx.clearRect(0, 0, width, height);

      // Dark gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, `hsl(${hueShift}, 50%, 10%)`);
      gradient.addColorStop(1, `hsl(${hueShift + 40}, 60%, 5%)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Noise
      const imageData = ctx.createImageData(width, height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const value = (Math.random() - 0.5) * 255 * noiseIntensity;
        imageData.data[i] = value;
        imageData.data[i + 1] = value;
        imageData.data[i + 2] = value;
        imageData.data[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);

      // Scanlines
      ctx.fillStyle = `rgba(0, 0, 0, ${scanlineIntensity})`;
      for (let y = 0; y < height; y += scanlineFrequency * 2) {
        ctx.fillRect(0, y, width, scanlineFrequency);
      }

      requestAnimationFrame(draw);
    };

    draw();
    return () => window.removeEventListener("resize", resize);
  }, [hueShift, noiseIntensity, scanlineIntensity, scanlineFrequency, warpAmount]);

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />;
}
