import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  AbsoluteFill,
  interpolate,
  Easing,
} from 'remotion';

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Animación del título - aparece y se agranda
  const titleScale = interpolate(frame, [0, 30], [0.5, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Animación de los círculos
  const circle1X = interpolate(
    frame,
    [30, 90],
    [100, 300],
    { easing: Easing.inOut(Easing.cubic) }
  );

  const circle2X = interpolate(
    frame,
    [45, 105],
    [1180, 980],
    { easing: Easing.inOut(Easing.cubic) }
  );

  const circle3Y = interpolate(
    frame,
    [60, 120],
    [600, 400],
    { easing: Easing.inOut(Easing.cubic) }
  );

  // Animación de desvanecimiento final
  const finalOpacity = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* Fondo degradado */}
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          opacity: finalOpacity,
        }}
      />

      {/* Círculos decorativos */}
      <div
        style={{
          position: 'absolute',
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          left: circle1X,
          top: 150,
          opacity: finalOpacity,
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          left: circle2X,
          top: 500,
          opacity: finalOpacity,
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.12)',
          left: 640,
          top: circle3Y,
          opacity: finalOpacity,
        }}
      />

      {/* Texto principal */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${titleScale})`,
          opacity: titleOpacity,
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            color: 'white',
            margin: 0,
            textShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          Pimero
        </h1>
        <p
          style={{
            fontSize: 28,
            color: 'rgba(255, 255, 255, 0.8)',
            marginTop: 20,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          Bienvenido a las animaciones
        </p>
      </div>
    </AbsoluteFill>
  );
};
