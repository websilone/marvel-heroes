import { renderToStaticMarkup as render } from 'react-dom/server'
import $ from 'cheerio'
import Loader from 'components/Loader'

describe('(Component) Loader', () => {
    it('should render as a <div> with "ui center segment" className', () => {
        const component = Loader({ text: 'Loader text' })
        expect(component.type).toEqual('div')
        expect(component.props.className).toEqual('ui center segment')
    });

    it('should inject the given text in a "ui text loader" div', () => {
        const html = render(Loader({ text: 'Loader text' }))
        const $text = $('div.ui.text.loader', html)

        expect($text.length).toEqual(1);
        expect($text.html()).toEqual('Loader text');
    });
});
