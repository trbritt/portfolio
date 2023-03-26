import * as React from "react"
import { Dialog } from "@headlessui/react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"

export const Dissertation = ({ isOpen, setIsOpen }) => {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001
	});
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
								scale: 0.5,
							}}
							animate={{
								opacity: 1,
								scale: 1,
								transition: {
									ease: "easeOut",
									duration: 0.2,
								},
							}}
							exit={{
								opacity: 0,
								scale: 0.75,
								transition: {
									ease: "easeIn",
									duration: 0.2,
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
										className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
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
export default Dissertation;
