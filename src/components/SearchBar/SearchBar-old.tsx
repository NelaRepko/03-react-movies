import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

export default function SearchBar({
  onSubmit,
}: {
  onSubmit: (query: string) => void;
}) {
  // Використовуємо нативний SubmitEvent для сучасного TS
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    // currentTarget завжди <form>
    const form = e.currentTarget as HTMLFormElement;
    const input = form.elements.namedItem("query") as HTMLInputElement;
    const value = input.value.trim();

    if (!value) {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(value);
    form.reset();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form
          className={styles.form}
          // Передаємо нативну подію SubmitEvent
          onSubmit={(e) => handleSubmit(e.nativeEvent as SubmitEvent)}
        >
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />

          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
