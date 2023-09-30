import { Player } from "@lottiefiles/react-lottie-player";

const Loading = () => {
  return (
    <Player
      autoplay
      loop
      src="../assets/lottie/loading.json"
      style={{
        height: "50vh",
        width: "50vw",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default Loading;
