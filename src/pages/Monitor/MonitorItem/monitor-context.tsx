import { GetMonitorIndexProps, getMonitorIndexs } from '@/api/monitor/monitor';
import { Form, FormInstance } from 'antd';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

export const MonitorConext = createContext<
  | {
      monitorIndexs?: GetMonitorIndexProps[];
      setHostVisible: (v: boolean) => void;
      setOpenNew: (v: boolean) => void;
      hostVisible: boolean;
      openNew: boolean;
      form: FormInstance<any>;
    }
  | undefined
>(undefined);

export const MonitorProvider = ({ children }: { children: ReactNode }) => {
  const [monitorIndexs, setMonitorIndexs] = useState<GetMonitorIndexProps[]>();
  const [selectHosts, setSelectHosts] = useState<React.Key[]>();
  const [hostVisible, setHostVisible] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    loadIndexsData();
  }, []);

  const loadIndexsData = async () => {
    const { data } = await getMonitorIndexs();
    setMonitorIndexs(data);
  };
  return (
    <MonitorConext.Provider
      value={{
        monitorIndexs,
        setHostVisible,
        hostVisible,
        openNew,
        setOpenNew,
        form,
      }}
    >
      {children}
    </MonitorConext.Provider>
  );
};
