import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Welcome() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    handleRedirect();
  }, [user]);

  const handleRedirect = () => {
    if (user) {
      navigate(`/allotments/${user.allotments.allotment_name}`);
    } else {
      navigate("/towns/Hartlepool");
    }
  };
}
