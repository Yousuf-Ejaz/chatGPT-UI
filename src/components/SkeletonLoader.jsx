function SkeletonLoader() {
	return (
		<div className=" w-full mx-auto">
			<div className="animate-pulse flex space-x-4">
				<div className="flex-1 space-y-3 py-1">
					<div className="h-3 bg-slate-200 rounded"></div>
					<div className="h-3 bg-slate-200 rounded"></div>
					<div className="h-3 bg-slate-200 rounded"></div>
					<div className="h-3 bg-slate-200 rounded"></div>
					<div className="space-y-3">
						<div className="grid grid-cols-3 gap-4">
							<div className="h-3 bg-slate-200 rounded col-span-2"></div>
							<div className="h-3 bg-white rounded col-span-1"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default SkeletonLoader;
