import { useFormStatus } from "react-dom";
import Image from "next/image";

function CartSubmitButton({ removeItem, index }) {
  const { pending } = useFormStatus();
  return (
    <div className="flex space-x-4 justify-end">
      <button className="" onClick={() => removeItem(index)}>
        <Image
          width={20}
          height={20}
          src="https://img.icons8.com/ios-filled/50/waste.png"
          alt="delete this item"
          className="w-5 h-auto"
        />
        <span>{pending && "deleting"}</span>
      </button>
    </div>
  );
}

export default CartSubmitButton;
