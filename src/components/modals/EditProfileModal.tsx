import React, {
	Fragment,
	useRef,
	useEffect,
	useState,
	PropsWithChildren
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRecoilState } from "recoil";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import { modalControllerState } from "../../atoms/modalControllerAtom";

const EditProfileModal: React.FC<PropsWithChildren> = ({ children }) => {
	const [modalState, setModalState] = useRecoilState(modalControllerState);
	const [user, loading, error] = useAuthState(auth);

	const { profileEditModalOpen: open } = modalState;

	const handleClose = () => {
		setModalState((prev) => ({
			...prev,
			profileEditModalOpen: false
		}));
	};

	const cancelButtonRef = useRef(null);

	// When user is not loaded, close the modal
	useEffect(() => {
		if (!user) handleClose();
	}, [user]);

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				initialFocus={cancelButtonRef}
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
												Edit Profile
											</Dialog.Title>
											{children}
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};
export default EditProfileModal;
