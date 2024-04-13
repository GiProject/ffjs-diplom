import React, { useEffect, useState } from "react";
import s from "./Upload.module.scss";
import { useController } from "react-hook-form";

interface UploadProps {
  name: string;
  control: any;
  options: any;
  defaultValue?: string[];
  deletedFiles?: number[];
  setDeletedFiles?: any;
}

const Upload: React.FC<UploadProps> = ({
  name,
  options,
  control,
  defaultValue,
  deletedFiles,
  setDeletedFiles,
}) => {
  let singleFileObj: any = [];
  let singleFileArray: any = [];

  const [singleFile, setSingleFile] = useState<any>([]);
  const [defaultFiles, setDefaultFiles] = useState<any[]>([]);

  useEffect(() => {
    if (defaultValue) {
      const arrayOfObjects = defaultValue.map((item: any, id: any) => {
        return {
          id: id,
          url: item,
        };
      });
      setDefaultFiles(arrayOfObjects);
    }
  }, [defaultValue?.length]);

  const uploadSingleFiles = (e: any) => {
    singleFileObj.push(e.target.files);
    singleFileArray.push(URL.createObjectURL(singleFileObj[0][0]));
    setSingleFile([...singleFile, singleFileArray]);
  };

  const removeImage = (index: any) => {
    setSingleFile([
      ...singleFile.slice(0, index),
      ...singleFile.slice(index + 1, singleFile.length),
    ]);
  };

  const removeDefaultImage = (index: any) => {
    setDefaultFiles([
      ...defaultFiles.slice(0, index),
      ...defaultFiles.slice(index + 1, defaultFiles.length),
    ]);
    setDeletedFiles &&
      deletedFiles &&
      setDeletedFiles([...deletedFiles, index]);
  };

  useEffect(() => {
    if (singleFile.length > 0) {
      const imagesAsFiles: File[] = [];

      singleFile.forEach((imageURL: any) => {
        fetch(imageURL)
          .then((r) => r.blob())
          .then((b) => {
            const imageFile = new File([b], "file.jpeg", {
              type: "image/jpeg",
            });
            imagesAsFiles.push(imageFile);
          });
      });

      field.onChange(imagesAsFiles);
    }
  }, [singleFile]);

  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules: options,
  });

  return (
    <div className={s.Upload}>
      <div className={s.Row}>
        {defaultFiles?.length !== 0 &&
          defaultFiles?.map((item: any, index: any) => (
            <div key={item.id} className={s.ImageContainer}>
              <img src={item.url} alt="..." />
              <span
                className={s.Remove}
                onClick={() => removeDefaultImage(item.id)}
              >
                x
              </span>
            </div>
          ))}
        {singleFile.length !== 0 &&
          singleFile.map((url: string, index: any) => (
            <div key={url} className={s.ImageContainer}>
              <img src={url} alt="..." />
              <span className={s.Remove} onClick={() => removeImage(index)}>
                x
              </span>
            </div>
          ))}

        {singleFile.length >= 3 - (defaultValue?.length || 0) ? null : (
          <label className={s.Add}>
            <div className={s.Icon}>+</div>
            <input
              type="file"
              accept="image/png, image/jpeg"
              name={name}
              onChange={uploadSingleFiles}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default Upload;
