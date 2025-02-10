import os

if os.environ.get("DJANGO_SETTINGS_MODULE", None) is None:
    from dotenv import load_dotenv

    from config.paths import PROJECT_DIR

    load_dotenv(
        dotenv_path=PROJECT_DIR / ".envs/.env.local",
        verbose=True,
    )
