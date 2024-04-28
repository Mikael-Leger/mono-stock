import Button from "../button/button";
import { useRouter } from 'next/router';
import { FaAngleLeft } from "react-icons/fa";
import "./back-button.scss"

export default function BackButton(props) {
  const router = useRouter();

  const goBack = () => {
    const fullUrl = router.asPath;
    const pathArr = fullUrl.split('/');
    pathArr.pop();
    const newUrl = pathArr.join('/');
    console.log({newUrl});
    router.push(newUrl || '/');
  }

  return (
    <div className='back-button'>
      <Button onClick={goBack} icon={<FaAngleLeft className='icon-medium' />} circle />
    </div>
  );
}
