export const handleImageChange = (
  e,
  setSelectedImages,
  setError,
  setImages
) => {
  const files = Array.from(e.target.files);
  const errors = [];

  files.forEach((file) => {
    if (file.size > 5 * 1024 * 1024) {
      errors.push(`File "${file.name}" exceeds the 5MB size limit.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const imageDetails = {
        name: file.name,
        size: file.size,
        type: file.type,
        src: reader.result,
      };
      setSelectedImages((prev) => [...prev, imageDetails]);
    };

    setImages((image) => [...image, file]);

    reader.readAsDataURL(file);
  });

  if (errors.length > 0) setError(errors.join("\n"));
  else {
    setError("");
  }
};

export const handleFileChange = (e, setSelectedFile, setError) => {
  const file = e.target.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
    setError("Only image and PDF files are allowed.");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    setError(`File "${file.name}" exceeds the 5MB size limit.`);
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const imageDetails = {
      name: file.name,
      size: file.size,
      type: file.type,
      src: file.type.startsWith("image/") ? reader.result : null,
      file,
    };

    setSelectedFile(imageDetails);
    setError("");
  };

  if (file.type.startsWith("image/")) reader.readAsDataURL(file);
  else {
    const fileDetails = {
      name: file.name,
      size: file.size,
      type: file.type,
      src: null,
      file,
    };

    setSelectedFile(fileDetails);
    setError("");
  }
};

export const formatFileSize = (size) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  if (size < 1024 * 1024 * 1024)
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

export const removeImage = (index, setSelectedImages, setImages) => {
  setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  setImages((prev) => prev.filter((_, i) => i !== index));
};
