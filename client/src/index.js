// do manual page refresh when template is changed
if (module.hot) {
    module.hot.accept('../../views/index.ejs', () => {
        location.reload();
    });
}

import '../../views/index.ejs';
import '../styles/main.scss';
import './main';
