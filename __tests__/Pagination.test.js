import {mount} from 'enzyme';
import wait from 'waait'; 
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import Pagination, {PAGINATION_QUERY} from '../components/Pagination';
import Router from 'next/router';

Router.router = {
  push() {},
  prefetch() {}
}

function makeMocksFor(length) {
  return [
    {
      request: { query: PAGINATION_QUERY },
      result: {
        data: {
          itemsConnection: {
            __typename: 'aggregate',
            aggregate: {
              count: length,
              __typename: 'count',
            },
          },
        },
      },
    },
  ];
}

describe('<Pagination />', () => {
  it('displays a loading message', () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(1)}>
        <Pagination page={1}></Pagination>
      </MockedProvider>
    );
    expect(wrapper.text()).toContain('loading...');
    // const pagination = wrapper.find('[data-test="pagination"]')
    // expect(pagination).toMatchSnapshot();
  });
  
  it('renders pagination for 18 items', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={1}></Pagination>
      </MockedProvider>
    );
      await wait();
      wrapper.update();
      expect(wrapper.find('.total-pages').text()).toEqual(' 5 ');
      const nav = wrapper.find('div[data-test="pagination"]');
  });

  it('disables prev button on the first page', async() => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={1}></Pagination>
      </MockedProvider>
    );
      await wait();
      wrapper.update();
      expect(wrapper.find('a.prev').prop('aria-disabled')).toEqual(true);
      expect(wrapper.find('a.next').prop('aria-disabled')).toEqual(false);
    
  });

  it('disables next button on the last page',async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={5}></Pagination>
      </MockedProvider>
    );
      await wait();
      wrapper.update();
      expect(wrapper.find('a.prev').prop('aria-disabled')).toEqual(false);
      expect(wrapper.find('a.next').prop('aria-disabled')).toEqual(true);
    
  });

  it('enables all button on a middle page', async() => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={3}></Pagination>
      </MockedProvider>
    );
      await wait();
      wrapper.update();
      expect(wrapper.find('a.prev').prop('aria-disabled')).toEqual(false);
      expect(wrapper.find('a.next').prop('aria-disabled')).toEqual(false);
    
  });


});

