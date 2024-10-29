"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

const AddPostButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      size={'sm'}
      disabled={pending}
    >
      {pending ? (
        'Sending'
      ) : (
        "Send"
      )}
    </Button>
  );
};

export default AddPostButton;
