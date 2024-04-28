import Button from "../button/button";
import { useRouter } from 'next/router';
import { FaAngleLeft } from "react-icons/fa";
import "./back-button.scss"

export default function BackButton(props) {
  const router = useRouter();

  const goBack = () => {
    router.back()
  }

  return (
    <div className='back-button'>
      <Button onClick={goBack} icon={<FaAngleLeft className='icon-medium' />} circle />
    </div>
  );
}
