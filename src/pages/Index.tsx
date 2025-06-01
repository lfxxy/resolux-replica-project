
import { Navigate } from "react-router-dom";

const Index = () => {
  // Always redirect to login page since that's our homepage
  return <Navigate to="/" replace />;
};

export default Index;
