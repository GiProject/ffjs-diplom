import React, { useEffect, useState } from "react";
import s from "./Upload.module.scss";
import { useController } from "react-hook-form";

interface UploadProps {
  name: string;
  control: any;
  options: any;
}

const Upload: React.FC<UploadProps> = ({ name, options, control }) => {
  let singleFileObj: any = [];
  let singleFileArray: any = [];
  const [singleFile, setSingleFile] = useState<any>([]);

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

  useEffect(() => {
    if (singleFile.length > 0) {
      field.onChange(singleFile);
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
        {singleFile.length !== 0 &&
          singleFile.map((url: string, index: any) => (
            <div key={url} className={s.ImageContainer}>
              <img src={url} alt="..." />
              <span className={s.Remove} onClick={() => removeImage(index)}>
                x
              </span>
            </div>
          ))}

        {singleFile.length >= 3 ? null : (
          <label className={s.Add}>
            <div className={s.Icon}>+</div>
            <input type="file" name={name} onChange={uploadSingleFiles} />
          </label>
        )}
      </div>
    </div>
  );
};

export default Upload;
