import React, { Fragment, ReactElement, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function BaseModal({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  children: ReactElement;
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0"
        onClose={setOpen}
      >
        <div className="grid grid-cols-1 items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-gray-400 bg-opacity-60 transition-opacity" />
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="mx-auto inline-block bg-primary rounded-xl text-left overflow-hidden shadow-xl transform transition-all w-4/5 sm:w-3/5 md:w-3/6 lg:w-2/5 xl:w-2/6">
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
