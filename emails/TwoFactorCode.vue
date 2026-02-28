<template>
    <EHtml lang="en">
        <EHead />
        <EPreview>Your AMA Water Admin Login Code</EPreview>
        <EBody :style="main">
            <EContainer :style="container">
                <EImg src="https://amawater.com/logo.png" width="150" alt="AMA Water" :style="logo" />
                <ESection :style="section">
                    <EText :style="heading">Two-Factor Authentication</EText>
                    <EText :style="text">
                        Hello,
                    </EText>
                    <EText :style="text">
                        We detected a login attempt for your AMA Water Admin account. Please use the following 4-digit
                        code to complete your login. This code is valid for 10 minutes.
                    </EText>
                    <ESection :style="codeContainer">
                        <EText :style="codeText">
                            {{ code }}
                        </EText>
                    </ESection>
                    <EText :style="text">
                        If you did not attempt to log in, please reset your password immediately as someone may have
                        compromised your account.
                    </EText>
                </ESection>
                <EText :style="footer">
                    This is an automated security message from AMA Water. DO NOT share this code with anyone.
                </EText>
            </EContainer>
        </EBody>
    </EHtml>
</template>

<script setup lang="ts">
defineProps<{
    code: string
}>()

const main = {
    backgroundColor: '#f6f9fc',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
}

const logo = {
    margin: '0 auto',
    marginBottom: '24px',
}

const section = {
    padding: '0 48px',
}

const heading = {
    fontSize: '24px',
    letterSpacing: '-0.5px',
    lineHeight: '1.3',
    fontWeight: '600',
    color: '#0f172a',
    padding: '17px 0 0',
}

const text = {
    color: '#475569',
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'left' as const,
    marginBottom: '16px'
}

const codeContainer = {
    background: 'rgba(0,0,0,.05)',
    borderRadius: '4px',
    margin: '16px 0',
    padding: '16px',
}

const codeText = {
    fontSize: '32px',
    fontWeight: '700',
    letterSpacing: '6px',
    color: '#0f172a',
    textAlign: 'center' as const,
    margin: '0',
}

const footer = {
    color: '#94a3b8',
    fontSize: '12px',
    lineHeight: '16px',
    padding: '0 48px',
    marginTop: '24px',
    textAlign: 'center' as const,
}
</script>
