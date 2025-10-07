import videoSrc from '../../assets/intro.mp4';

export default function Intro() {
  return (
    <div className="bg-black min-h-screen">
      <video
        src={videoSrc}
        alt="Intro Video"
        className="w-full h-screen object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
}
