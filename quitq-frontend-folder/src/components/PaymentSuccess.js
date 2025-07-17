// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function PaymentSuccess() {
//   const navigate = useNavigate();

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <div style={styles.tick}>✓</div>
//         <h2>Your Order has been placed!</h2>
//         <p>You will receive a confirmation email shortly.</p>
//         <button onClick={() => navigate("/usercategory")} className="btn btn-primary mt-3">
//           Back to Shopping
//         </button>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     background: "linear-gradient(to right, #003366, #0055aa)",
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     color: "white"
//   },
//   card: {
//     background: "white",
//     color: "black",
//     padding: "40px",
//     borderRadius: "20px",
//     textAlign: "center",
//     boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
//   },
//   tick: {
//     fontSize: "60px",
//     color: "green",
//     marginBottom: "20px"
//   }
// };
import React from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import successAnim from "../animations/success.json"; // adjust path as needed

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* ✅ Replace ✓ tick with Lottie animation */}
        <Player
          autoplay
          loop
          src={successAnim}
          style={{ height: "250px", width: "250px", marginBottom: "20px" }}
        />

        <h2>Your Order has been placed!</h2>
        {/* <p>You will receive a confirmation email shortly.</p> */}

        <button
          onClick={() => navigate("/usercategory")}
          className="btn btn-primary mt-3"
        >
          Back to Shopping
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "linear-gradient(to right, #003366, #0055aa)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  },
  card: {
    background: "white",
    color: "black",
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
  }
};
