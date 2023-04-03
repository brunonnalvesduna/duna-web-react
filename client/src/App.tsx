// routing
import Routes from './routes';

// project imports
import Locales from './ui-component/Locales';
import NavigationScroll from './layout/NavigationScroll';
import RTLLayout from './ui-component/RTLLayout';
import Snackbar from './ui-component/extended/Snackbar';
import ThemeCustomization from './themes';

// ==============================|| APP ||============================== //

const App = () => (
    <ThemeCustomization>
        {/* RTL layout */}
        <RTLLayout>
            <Locales>
                <NavigationScroll>
                    <>
                        <Routes />
                        <Snackbar />
                    </>
                </NavigationScroll>
            </Locales>
        </RTLLayout>
    </ThemeCustomization>
);

export default App;
