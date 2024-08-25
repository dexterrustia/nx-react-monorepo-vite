import styled from '@emotion/styled';
import { Editor, type IAllProps } from '@tinymce/tinymce-react';

const API_KEY = 'qz6d2vg1vgputwnbj99fq61p16poak1iezl08pze2jhmkijp';

const createFileInput = () => {
  const fileInput = document.createElement('input');
  fileInput.setAttribute('type', 'file');
  fileInput.setAttribute(
    'accept',
    'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
  );
  fileInput.setAttribute('style', 'display: none;');
  return fileInput;
};

const readAsDataURL = (
  files: FileList,
  callback: (result: string, file: File) => void
): void => {
  [].forEach.call(files, (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) {
        callback(event.target.result as string, file);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blob = (file as any).getAsFile ? (file as any).getAsFile() : file;
    if (blob instanceof Blob) {
      reader.readAsDataURL(blob);
    }
  });
};

const Container = styled.div`
  .tox-statusbar__right-container {
    svg {
      display: none;
    }
  }
`;

export type HtmlEditorProps = IAllProps;

export const HtmlEditor = (props: HtmlEditorProps) => {
  return (
    <Container>
      <Editor
        apiKey={API_KEY}
        {...props}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap preview anchor',
            'searchreplace visualblocks fullscreen',
            'insertdatetime media table paste help wordcount hr',
          ],
          toolbar: `
          undo redo | formatselect | bold italic forecolor backcolor |
          alignleft aligncenter alignright alignjustify |
          bullist numlist outdent indent |
          link image media | table | hr | removeformat | preview visualblocks fullscreen | searchreplace | help
        `,
          paste_data_images: true,
          image_title: true,
          automatic_uploads: false,
          file_picker_types: 'image',
          file_picker_callback: function (callback) {
            const fileInput = createFileInput();
            fileInput.addEventListener('change', () => {
              if (fileInput.files && fileInput.files.length > 0) {
                readAsDataURL(
                  fileInput.files,
                  (dataUri: string, file: File) => {
                    callback(dataUri, {
                      title: file.name,
                    });
                  }
                );
              }
            });
            fileInput.click();
          },
          ...props.init,
        }}
      />
    </Container>
  );
};

export default HtmlEditor;
