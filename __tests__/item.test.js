import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json'

const fakeItem = {
  id: 'ABC123',
  title: 'A Cool Item',
  price: 5000,
  description: 'fuck you',
  image: 'dog.jpg',
  largeImage: 'largeDog.jpg'
}

describe('<Item />', () => {

  it('renders and matches the snapshot', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem}/>)
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  // it('renders the image properly', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem}/>)
  //    const image = wrapper.find('img');
  //    expect(image.props().src).toBe(fakeItem.image);
  //    expect(image.props().alt).toBe(fakeItem.title);
  // });



  // it('renders and the price tag and title properly', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem}/>)
  //   const PriceTag = wrapper.find('PriceTag');
  //   expect(PriceTag.children().text()).toBe('$50');
  //   expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
  //   // console.log(image.debug());
  // });

  // it('renders out the buttons properly', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem}/>);
  //   // console.log(wrapper.debug());
  //   const buttonList = wrapper.find('.buttonlist');
  //   expect(buttonList.find('Link')).toHaveLength(1);
  //   expect(buttonList.find('AddToCart').exists()).toBeTruthy();
  //   expect(buttonList.find('DeleteItem').exists()).toBeTruthy();
  //   expect(buttonList.children()).toHaveLength(3);
  // });
});