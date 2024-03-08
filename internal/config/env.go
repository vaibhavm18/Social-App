package config

import (
	"path/filepath"

	"github.com/joho/godotenv"
)

func LoadEnv() error {
	err := godotenv.Load(filepath.Join(".env"))

	if err != nil {
		return err
	}

	return nil
}
