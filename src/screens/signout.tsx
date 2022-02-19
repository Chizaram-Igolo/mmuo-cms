import { Navigate } from "react-router-dom";

export default function Signout() {
  return <Navigate to="/login" />;
}
