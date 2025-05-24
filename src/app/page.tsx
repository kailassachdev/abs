
import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/'); // Redirect to the main intro page which is now at / under the (main) group
}
