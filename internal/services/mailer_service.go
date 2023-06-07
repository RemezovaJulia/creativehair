package services

import (
	"crypto/tls"
	"fmt"
	"net/smtp"
	"strconv"
)

type ClientData struct {
	ClientName  string
	ClientPhone string
	ClientEmail string
	Date        string
	Time        string
}

type Mailer struct {
	SmtpUsername string
	SmtpPassword string
	SmtpHost     string
	SmtpPort     int
	From         string
	To           string
	Body         string
	Message      string
	clientData   ClientData
}

func NewMailer(smtpUsername, smtpPass, smtpHost string, port int, from, to string, clientData ClientData) *Mailer {
	return &Mailer{From: from, To: to, clientData: clientData,
		SmtpUsername: smtpUsername, SmtpPassword: smtpPass, SmtpHost: smtpHost, SmtpPort: port}
}

func (m *Mailer) generateMessage() {
	m.Body = fmt.Sprintf("У Вас запись на\n%s чило\nВремя: %s\nИмя клиента: %s\nТелефон клиента: %s\nEmail: %s",
		m.clientData.Date, m.clientData.Time, m.clientData.ClientName, m.clientData.ClientPhone,
		m.clientData.ClientEmail)
	message := fmt.Sprintf("From: %s\r\n", m.From)
	message += fmt.Sprintf("To: %s\r\n", m.To)
	message += fmt.Sprintf("Subject: %s\r\n", "Новая Запись")
	message += "\r\n" + m.Body
	m.Message = message
}

func (m *Mailer) Send() error {
	m.generateMessage()
	// Установка соединения с сервером SMTP
	conn, err := tls.Dial("tcp", m.SmtpHost+":"+strconv.Itoa(m.SmtpPort), nil)
	if err != nil {
		return err
	}

	// Создание клиента SMTP
	client, err := smtp.NewClient(conn, m.SmtpHost)
	if err != nil {
		return err
	}

	// Аутентификация
	auth := smtp.PlainAuth("", m.From, m.SmtpPassword, m.SmtpHost)
	if err := client.Auth(auth); err != nil {
		return err
	}

	// Установка отправителя и получателя
	if err := client.Mail(m.From); err != nil {
		return err
	}
	if err := client.Rcpt(m.To); err != nil {
		return err
	}

	// Отправка письма
	w, err := client.Data()
	if err != nil {
		return err
	}
	_, err = w.Write([]byte(m.Message))
	if err != nil {
		return err
	}
	err = w.Close()
	if err != nil {
		return err
	}

	// Завершение соединения
	err = client.Quit()
	if err != nil {
		return err
	}

	return nil
}
