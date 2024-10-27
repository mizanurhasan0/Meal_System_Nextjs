"use client"

export default function ImageUpload() {
    function onSubmit(event) {
        event.preventDefault();
        console.log(event.target.files);

    }
    return (
        <div className="w-[400px] relative border-2 border-gray-300 border-dashed rounded-lg p-6" id="dropzone">
            <input type="file" className="absolute inset-0 w-full h-full opacity-0 z-50" onChange={onSubmit} name="upload-file" id="upload-file" />
            <div className="text-center">
                <img className="mx-auto h-12 w-12" src="https://www.svgrepo.com/show/357902/image-upload.svg" alt="" />

                <h3 className="mt-2 text-sm font-medium text-gray-900">
                    <label htmlFor="file-upload" className="relative cursor-pointer">
                        <span>Drag and drop</span>
                        <span className="text-indigo-600"> or browse</span>
                        <span>to upload</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                </p>
            </div>

            <img src="" className="mt-4 mx-auto max-h-40 hidden" id="preview" />
        </div>
    )
}
