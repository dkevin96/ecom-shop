import React, { useEffect, useState, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Highlighter from 'react-highlight-words';
import { AlertCircle } from 'react-feather';
import { Table, Space, Button, Input, Popconfirm, Form } from 'antd';
import { CheckOutlined, CloseOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

import { Badge } from '@windmill/react-ui';
import { selectCurrentUser, selectAllUser, fetchAllUser, deleteUser, selectDeleteUserStatus } from '../../features/users/usersSlice';
import ConfirmRemoveDialog from '../dialog/ConfirmRemoveDialog';
import toast from 'react-hot-toast';

const AdminFormAntd = props => {
  const dispatch = useDispatch();
  const deleteStatus = useSelector(selectDeleteUserStatus);

  const [dataSource, setDataSource] = useState(props.dataSource);
  const { currentUser } = props;
  const [isDialogOpen, setisDialogOpen] = useState(false);

  //   UDAPTE STATE FROM DATASOURCE
  useEffect(() => {
    setDataSource(props.dataSource);
  }, [props]);

  //Filter
  const searchInput = useRef();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchColumn] = useState('');

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchColumn(dataIndex);
            }}
          >Filter</Button> */}
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => (record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : ''),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  //********************************************************************************* */

  //Define Columns for table
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      defaultSortOrder: 'descend',
      ...getColumnSearchProps('first_name'),
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
      defaultSortOrder: 'descend',
      ...getColumnSearchProps('last_name'),
    },
    {
      title: 'Date',
      dataIndex: 'date_joined',
      key: 'date_joined',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.date_joined.localeCompare(b.date_joined),
    },
    {
      title: 'User Role',
      dataIndex: 'user_role',
      key: 'user_role',
      ...getColumnSearchProps('user_role'),
      render: user_role => (
        <span>{user_role === 'admin' ? <Badge type="success">{user_role}</Badge> : <Badge type="primary">{user_role}</Badge>}</span>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <DeleteOutlined theme="filled" style={{ color: 'red', fontSize: '20px' }} />
          </Popconfirm>
        ) : null,
    },
  ];

  const handleDelete = key => {
    const user = dataSource.find(user => user.id === key);
    if (user.email === 'admin@mail.com') {
      toast.error('Cannot delete default admin user!');
      return;
    }

    if (currentUser.id === key) {
      toast.error('Cannot delete current user!');
    } else {
      dispatch(deleteUser(key));
      toast.success('Delete Succesfully');
    }
  };

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        //   handleSave: handleSave,
      }),
    };
  });

  return (
    <div>
      <div>
        <Table pagination={{ pageSize: 5 }} bordered dataSource={dataSource} columns={mergedColumns} rowClassName={() => 'editable-row'} />
      </div>
    </div>
  );
};

export default AdminFormAntd;
