import StackIcon from "../Icons/StackIcon";

function LibraryHeader() {
	return (
		<div className="  px-5 py-3 bg-[#fcfcf9] mt-2 rounded-t-md mx-2 border-b  ">
			<div className="max-w-[650px]  flex gap-3 mx-auto text-violet-950 ">
				<div className="flex flex-col justify-center w-7 h-7 my-auto  ">
					<StackIcon />
				</div>
				<div className="font-bold text-4xl font-['Syne'] ">Library</div>
			</div>
		</div>
	);
}
export default LibraryHeader;
