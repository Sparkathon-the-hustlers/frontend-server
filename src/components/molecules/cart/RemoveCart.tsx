import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import Spinner from "../global/Spinner";

type RemoveIconProps = {
  onClick: () => void;
  isRemoving: boolean;
};

export const RemoveCart: React.FC<RemoveIconProps> = ({
  onClick,
  isRemoving,
}) => {
  return (
    <Button
      onClick={onClick}
      className="border border-gray-300 px-2 rounded text-blue-700"
    >
      {isRemoving ? (
        <Spinner className="text-sblue-700/100 mr-0" />
      ) : (
        <X className="w-5 h-5 font-semibold" />
      )}
    </Button>
  );
};
