const Popup = ({ isOpen, children }) => {
	return (
		<div
			className={`fixed inset-0 flex items-center justify-center  ${
				isOpen ? "block" : "hidden"
			}`}
		>
			<div className="fixed inset-0 bg-black opacity-85 popup-background"></div>
			<div className="z-30 p-4 m-4 bg-[#eaeae4] rounded-md shadow-lg ">
				{children}
			</div>
		</div>
	);
};

export default Popup;
