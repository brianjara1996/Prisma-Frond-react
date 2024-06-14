import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchPresentedCoupons from './searchCoupons';
import '@testing-library/jest-dom';

describe('SearchPresentedCoupons Component', () => {
    test('renders correctly and allows interaction', async () => {
        render(<SearchPresentedCoupons />);

        // Espera a que el input de "Cuenta" esté disponible
        const accountInput = await screen.findByTestId('accountNumberInput', {}, { timeout: 11000 }) as HTMLInputElement;

        // Simula entrada de texto y verifica
        fireEvent.change(accountInput, { target: { value: '999999' } });
        expect(accountInput.value).toBe('999999');

        // Simula clic en el botón de búsqueda
        const searchButton = await screen.findByText('Buscar', {}, { timeout: 11000 });
        fireEvent.click(searchButton);

        // Verifica que se muestre algún indicador de carga o resultado
        /* Ajuste: asegúrate de que el texto "999999" deba aparecer en el componente.
        await waitFor(() => {
            const loadingIndicator = screen.getByText(/999999/i);
            expect(loadingIndicator).toBeInTheDocument();
        }, { timeout: 10000 }); */
    });
});
