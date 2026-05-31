import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Download, FileSpreadsheet } from 'lucide-react';
import { ExcelService } from '../services/excelService';
import { Vehicle, Order } from '../types';

interface Props {
  onDataLoaded: (vehicles: Vehicle[], orders: Order[]) => void;
  currentVehicles: Vehicle[];
  currentOrders: Order[];
}

export const DataManager: React.FC<Props> = ({ onDataLoaded, currentVehicles, currentOrders }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setIsLoading(true);
    try {
      const data = await ExcelService.readExcelFile(file);
      onDataLoaded(data.vehicles, data.orders);
      alert(`Загружено: ${data.vehicles.length} ТС, ${data.orders.length} заказов.`);
    } catch (err) {
      alert("Ошибка чтения файла!");
    } finally {
      setIsLoading(false);
    }
  }, [onDataLoaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] },
    maxFiles: 1
  });

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mt-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <FileSpreadsheet className="w-5 h-5 text-green-500" /> Excel База Данных
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-gray-500'}`}>
          <input {...getInputProps()} />
          <UploadCloud className="w-10 h-10 mx-auto mb-3 text-gray-500" />
          <p className="text-sm text-gray-300">{isDragActive ? 'Отпустите файл...' : 'Перетащите .xlsx файл сюда'}</p>
        </div>
        <div className="flex flex-col justify-center items-start space-y-4">
          <div className="text-sm text-gray-400">
            <p>В базе: {currentVehicles.length} ТС, {currentOrders.length} заказов</p>
          </div>
          <button onClick={() => ExcelService.exportToExcel(currentVehicles, currentOrders)} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition w-full justify-center">
            <Download className="w-4 h-4" /> Скачать базу (.xlsx)
          </button>
        </div>
      </div>
    </div>
  );
};