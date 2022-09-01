package main

import (
	"log"

	"github.com/pocketbase/pocketbase"
)
import _ "recipehub/migrations"

func main() {
	app := pocketbase.New()

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
