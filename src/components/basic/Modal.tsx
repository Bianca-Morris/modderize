import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, PropsWithChildren, ReactNode, useRef } from "react";

interface ModalProps extends PropsWithChildren {
	title: string;
	open: boolean;
	footer?: ReactNode;
	handleClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
	open,
	title,
	footer,
	children,
	handleClose
}) => {
	// const cancelButtonRef = useRef(null);

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				// initialFocus={cancelButtonRef}
				onClose={handleClose}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
								<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
									<div className="flex items-center justify-center">
										<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
											<Dialog.Title
												as="h1"
												className="text-xl text-center font-bold font-medium text-gray-900"
											>
												{title}
											</Dialog.Title>
											{children}
										</div>
									</div>
								</div>
								{footer && (
									<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:justify-end sm:px-6">
										{footer}
									</div>
								)}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default Modal;
