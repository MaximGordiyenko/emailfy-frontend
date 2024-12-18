import { useState } from 'react';
import { useMainContext } from '../../context/MainContext';

import { useQuery } from '@tanstack/react-query';
import { getEmailClientsData, getTagsStatistic } from '../../api/tags/tags';

import { useForm } from 'react-hook-form';

import { tableColumns, tooltipMessages, tagTableColumns } from './tags.constants';
import { TagMultiSelect } from '../../components/selects/TagMultiSelect';

import { Table, Checkbox, Divider, Tooltip, Typography, Tag } from 'antd';
import { TagMenu } from './TagsMenu';
const { Title } = Typography;

export const TagsPage = () => {
  const { isOpenMenu } = useMainContext();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(signInValidation),
    defaultValues: {},
  });

  const { data: emailClientInfo, isLoading: emailClientInfoLoading } = useQuery({
    queryKey: ['getEmailClientsData'],
    queryFn: getEmailClientsData,
    retry: 1,
    refetchOnWindowFocus: false, // Disable refetching on window focus
    onError: (error) => {},
  });

  const { data: tagsStatisticData, isLoading: tagsStatisticLoading } = useQuery({
    queryKey: ['getTagsStatistic'],
    queryFn: getTagsStatistic,
    retry: 1,
    refetchOnWindowFocus: false, // Disable refetching on window focus
    onError: (error) => {},
  });

  const formattedTags = []?.map((item) => ({
    label: item,
    value: item,
  }));

  // Dynamically generate columns
  const columns = Object.entries(tableColumns).map(([key, dataIndex]) => ({
    title: key?.charAt(0).toUpperCase() + key?.slice(1), // Capitalize only the title dynamically
    dataIndex, // Use the value as the dataIndex
    key: dataIndex, // Unique key for each column
    ...(dataIndex === 'firstname' || dataIndex === 'lastname' || dataIndex === 'tags'
      ? {
          sorter: (a, b) => a[dataIndex]?.localeCompare(b[dataIndex]),
        }
      : {}),
    ...(dataIndex === 'tags' && {
      render: (tag) => {
        const tagColors = {
          passive: '#D36700', // Orange
          active: '#7E9D00', // Green
          block: '#FF5656', // Red
          wait: '#666DA5', // Purple
        };

        const color = tagColors[tag] || 'default'; // Fallback color
        return (
          <Tag color={color} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        );
      },
    }),
  }));

  const tagsColumns = Object?.entries(tagTableColumns)?.map(([key, dataIndex]) => ({
    title: key?.charAt(0)?.toUpperCase() + key?.slice(1), // Capitalize only the title dynamically
    dataIndex, // Use the value as the dataIndex
    key: dataIndex, // Unique key for each column
    ...(dataIndex === 'tag' || dataIndex === 'created'
      ? {
          sorter: (a, b) => a[dataIndex]?.localeCompare(b[dataIndex]),
        }
      : {}),
    ...(dataIndex === 'tag' && {
      render: (tag) => {
        const tagColors = {
          passive: '#D36700', // Orange
          active: '#7E9D00', // Green
          block: '#FF5656', // Red
          wait: '#666DA5', // Purple
        };

        const color = tagColors[tag] || 'default'; // Fallback color
        return (
          <Tag color={color} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        );
      },
    }),
  }));

  const defaultCheckedList = columns.map((item) => item.key);

  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  // Use fetchedData as dataSource
  const dataSource = emailClientInfo?.map((item) => ({
    ...item,
    email: item.email,
    firstname: item.firstName,
    lastname: item.lastName,
    address: item.address,
    tags: item.tagStatus,
    key: item.id,
  }));

  const tagsDataSource = tagsStatisticData?.map((item) => ({
    ...item,
    tag: item.tag,
    created: item.created,
    members: item.members,
    subscribers: item.subscribers,
    key: item.id,
  }));

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            return index % 2 === 0;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            return index % 2 !== 0;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const options = columns.map(({ key, title }) => ({
    label: title,
    value: key,
  }));

  const newColumns = columns.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item.key),
  }));

  return (
    <div className="tags-page-container">
      {isOpenMenu && <TagMenu />}
      <Divider orientation="left">
        <Tooltip title={tooltipMessages.hideColumn} placement="topLeft">
          <Title level={3} type="secondary">
            Search and filter by tags
          </Title>
        </Tooltip>
      </Divider>

      <TagMultiSelect
        name={'tags'}
        control={control}
        options={formattedTags}
        onChange={handleChange}
      />

      <Divider orientation="left">
        <Tooltip title={tooltipMessages.hideColumn} placement="topLeft">
          <Title level={3} type="secondary">
            Show or hide column
          </Title>
        </Tooltip>
      </Divider>
      <Checkbox.Group
        value={checkedList}
        options={options}
        onChange={(value) => {
          setCheckedList(value);
        }}
      />

      <Table rowSelection={rowSelection} columns={newColumns} dataSource={dataSource} />

      <Divider orientation="left">
        <Tooltip title={tooltipMessages.hideColumn} placement="topLeft">
          <Title level={3} type="secondary">
            Tags statistics
          </Title>
        </Tooltip>
      </Divider>

      <Table rowSelection={rowSelection} columns={tagsColumns} dataSource={tagsDataSource} />
    </div>
  );
};
