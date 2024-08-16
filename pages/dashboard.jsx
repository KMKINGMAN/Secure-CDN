import ProtectedRoute from '../components/ProtectedRoute';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { LockClosedIcon } from '@radix-ui/react-icons';
import { API_URL } from "@/utils/apj";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      listFiles();
    }
  }, [router]);

  const uploadFile = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file, file.name);

    try {
      const response = await axios.post(`${API_URL}/files/upload`, formData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      listFiles();
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const listFiles = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${API_URL}/files/files`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setFiles(response.data.files);
    } catch (error) {
      console.error('List files error:', error);
    }
  };

  const downloadFile = async (fileId, filename) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${API_URL}/files/download/${fileId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  const removeFile = async (fileId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_URL}/files/files/${fileId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      listFiles();
    } catch (error) {
      console.error('Remove file error:', error);
    }
  };

  return (
    <div className="tw-container tw-mx-auto tw-p-6">
      <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-mb-8">Secure File Saver</h1>
      <form onSubmit={uploadFile} className="tw-mb-8">
        <div className="tw-mb-4">
          <input type="file" className="tw-block tw-w-full tw-text-sm tw-text-gray-500 file:tw-mr-4 file:tw-py-2 file:tw-px-4 file:tw-rounded-full file:tw-border-0 file:tw-text-sm file:tw-font-semibold file:tw-bg-blue-50 file:tw-text-blue-700 hover:file:tw-bg-blue-100" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <button type="submit" className="tw-bg-green-500 tw-text-white tw-py-2 tw-px-4 tw-rounded tw-mr-2">Upload</button>
        {/* <button type="button" className="tw-bg-blue-500 tw-text-white tw-py-2 tw-px-4 tw-rounded" onClick={listFiles}>List Files</button> */}
      </form>
      <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-6">
        {files.map((file) => (
          <Card key={file.fileId} className="tw-bg-gray-100 tw-shadow-lg tw-rounded-lg">
            <CardHeader className="tw-p-4 tw-flex tw-items-center tw-justify-between">
              <span>{file.originalFilename}</span>
              <LockClosedIcon className="tw-w-5 tw-h-5 tw-text-gray-700" />
            </CardHeader>
            <CardContent className="tw-p-4">
              <p className="tw-text-gray-700">File ID: {file.fileId}</p>
            </CardContent>
            <CardFooter className="tw-p-4 tw-flex tw-justify-between tw-space-x-2">
              <button className="tw-bg-blue-500 tw-text-white tw-py-1 tw-px-3 tw-rounded" onClick={() => downloadFile(file.fileId, file.originalFilename)}>Download</button>
              <button className="tw-bg-red-500 tw-text-white tw-py-1 tw-px-3 tw-rounded" onClick={() => removeFile(file.fileId)}>Remove</button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default function ProtectedDashboard() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
