import * as React from "react"
import { Dialog } from "@headlessui/react"
import { motion, AnimatePresence } from "framer-motion"

type ModalProps = {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Dissertation = ({ isOpen, setIsOpen }: ModalProps) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<Dialog
					open={isOpen}
					onClose={setIsOpen}
					as="div"
					className="fixed inset-0 z-20 flex items-center justify-center overflow-y-auto"
				>
					<div className="flex backdrop-blur-sm bg-white/80 flex-col py-8 px-4 rounded-2xl text-center">
						<Dialog.Overlay />
						<div
							className="fixed inset-0 transition-opacity"
							aria-hidden="true"
						>
							<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
						</div>

						<motion.div
							className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
							initial={{
								opacity: 0,
								scale: 0.75,
							}}
							animate={{
								opacity: 1,
								scale: 1,
								transition: {
									ease: "easeOut",
									duration: 0.15,
								},
							}}
							exit={{
								opacity: 0,
								scale: 0.75,
								transition: {
									ease: "easeIn",
									duration: 0.15,
								},
							}}
						>
							<span
								className="hidden sm:inline-block sm:align-middle sm:h-screen"
								aria-hidden="true"
							>
								&#8203;
							</span>

							<div
								className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
								role="dialog"
								aria-modal="true"
								aria-labelledby="modal-headline"
							>
								<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
									<div className="sm:flex sm:items-start">
										<div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
											<svg
												className="h-6 w-6 text-red-600"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												aria-hidden="true"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
												/>
											</svg>
										</div>
										<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
											<Dialog.Title
												as="h3"
												className="text-lg leading-6 font-medium text-gray-900"
												id="modal-headline"
											>
												Dissertation
											</Dialog.Title>
											<div className="mt-2">
												<Dialog.Description
													as="p"
													className="text-sm text-gray-500"
												>
													I'm currently working on my dissertation, but when it's finished you'll be able to read it here! Stay tuned.
												</Dialog.Description>
											</div>
										</div>
									</div>
								</div>
								<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-evenly">
									<button
										type="button"
										tabIndex={0}
										className=" inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
										onClick={() => setIsOpen(false)}
									>
										Okay
									</button>
									<button
										type="button"
										tabIndex={0}
										className="mt-3 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
										onClick={() => setIsOpen(false)}
									>
										Also okay
									</button>
								</div>
							</div>
						</motion.div>
					</div>
				</Dialog>
			)}
		</AnimatePresence>
	)
}

// const center = {
//     x: window.innerWidth / 2,
//     y: window.innerHeight / 2,
//   };
  
  
//  const Dissertation = () => {
//     const [isOpen, setIsOpen] = useState(true);
//     return (
//         <motion.div
//           className={`z-20 absolute flex items-center justify-center h-screen left-[5px] right-[5px] top-[80px] bg-indigo-500/10 cursor-default`}
//           initial={{ opacity: 0, scale: 0.5, translateX: -center.x, translateY: -center.y }}
//           animate={isOpen ? { opacity: 1, scale: 1, translateX: 0, translateY: 0 } : { opacity: 0, scale: 1, translateX: 0, translateY: 0 }}
//         >
//              <div className='absolute left-[5px] right-[5px] top-[20px] h-[28px] mr-[16px]'>
//                       <motion.img animate src={close} alt="menu" className='w-[28px] h-[28px] object-contain cursor-pointer absolute' onClick={()=> {setIsOpen(false); console.log(isOpen);setIsOpen(true);}}/>
//               </div>
//             <p className='backdrop-blur-2xl text-secondary text-[17px] max-w-3xl'>Sed aliquam sollicitudin turpis, quis ullamcorper dolor finibus non. Suspendisse lacus arcu, finibus ac ligula quis, luctus luctus turpis. Quisque eleifend ex et eleifend pretium. Suspendisse ac lacus felis. Sed blandit finibus odio, sed viverra justo lacinia luctus. Aliquam sed arcu non elit malesuada fermentum a quis lorem. Curabitur at dui eleifend, ultricies lorem finibus, elementum nulla. Fusce ipsum mauris, aliquam non odio sed, finibus feugiat purus. Nam ac vehicula turpis, id laoreet massa. Aliquam sed condimentum augue. Ut eu augue pulvinar dolor porta congue. Morbi facilisis at nisl nec cursus. Nulla eu sapien feugiat, viverra augue sit amet, feugiat eros. Pellentesque nec massa enim. Morbi volutpat sollicitudin ante at elementum. Vestibulum pharetra dui at egestas tempor.</p>
//         </motion.div>
//     )
//   }

export default Dissertation;
